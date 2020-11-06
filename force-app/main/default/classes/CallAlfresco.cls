public with sharing class CallAlfresco{

	
	static final String userName = 'rubypoc';
	static final String password = 'Rubypoc2020';
	static final String domain = 'http://13.228.73.46:8080/';

	@AuraEnabled(cacheable = true)
	public static String getTicket(){
		String uri = 'alfresco/api/-default-/public/authentication/versions/1/tickets';
		Http http = new Http();
		HttpRequest request = new HttpRequest();
		request.setEndpoint(domain + uri);
		request.setMethod('POST');
		request.setHeader('Content-Type', 'application/json;charset=UTF-8');
		// 将主体设置为JSON对象
		request.setBody('{"userId":"' + userName + '","password":"' + password + '"}');
		HttpResponse response = http.send(request);

		// 解析JSON响应
		if (response.getStatusCode() != 201){
			//Convert REST response JSON to object
			System.debug('The status code returned is not what was expected: ' + response.getStatusCode()+'' + response.getStatus());
			return response.getBody();
		} else{
			//{"entry":{"id":"TICKET_14baedad9b665042124fbffe66d00815ca7e2192","userId":"rubypoc"}}
			Map<String, Object> m = (Map<String, Object>)JSON.deserializeUntyped(response.getBody());
			Map<String, Object> o = (Map<String, Object>)m.get('entry');
			String ticket = (String)o.get('id');
			System.debug('ticket:' + ticket);
			return ticket;
		}
	}

	@AuraEnabled(cacheable = true)
	public static string base64Encryption(String key){
		return EncodingUtil.base64Encode(Blob.valueOf(key));
	}

	@AuraEnabled(cacheable = true)
	public static string getAuthorizationValue(){
		String token = 'Basic ' + base64Encryption(getTicket());
		System.debug(token);
		return token;
	}

	@AuraEnabled(cacheable = true)
	public static String CreateFloderOrFileNode(String parentNodeId, String fieldName, String nodeType){
		// {"entry":{"aspectNames":["cm:auditable"],"createdAt":"2020-10-12T07:50:54.542+0000","isFolder":true,"isFile":false,"createdByUser":{"id":"rubypoc","displayName":"rubypoc"},"modifiedAt":"2020-10-12T07:50:54.542+0000","modifiedByUser":{"id":"rubypoc","displayName":"rubypoc"},"name":"My Other Folder","id":"00ca4338-d1a1-4ba9-841a-f59b7a9a6250","nodeType":"cm:folder","parentId":"4a752972-e5a9-41d3-870f-f89201913a9d"}}
		String uri = 'alfresco/api/-default-/public/alfresco/versions/1/nodes/' + parentNodeId + '/children?autoRename=true';
		// get access token
		// String token = 'Basic '+ base64Encryption(getTicket());
		String token = getAuthorizationValue();

		Http http = new Http();
		HttpRequest request = new HttpRequest();
		request.setEndpoint(domain + uri);
		request.setMethod('POST');
		request.setHeader('Content-Type', 'application/json;charset=UTF-8');
		request.setHeader('Authorization', token);
		System.debug('Authorization value: ' + token);
		// 将主体设置为JSON对象
		// nodeType 格式 floder cm:folder file cm:content
		request.setBody('{"name":"' + fieldName + '","nodeType":"' + nodeType + '"}');
		HttpResponse response = http.send(request);
		// 解析JSON响应
		if (response.getStatusCode() != 201){
			//Convert REST response JSON to object
			System.debug('The status code returned is not what was expected: ' + response.getStatusCode()+'' + response.getStatus()+'body: ' + response.getBody());
			return response.getBody();
		} else{
			// System.debug('create node result: ' + response.getBody());
			Map<String, Object> m = (Map<String, Object>)JSON.deserializeUntyped(response.getBody());
			Map<String, Object> o = (Map<String, Object>)m.get('entry');
			String nodeId = (String)o.get('id');
			// String name  = (String)o.get('name');
			System.System.debug('nodeId:' + nodeId);
			return nodeId;
		}
		//return fileInfo;
	}

	@AuraEnabled(cacheable = true)
	public static String uploadFileToNode(list<Object> filesToInsert){

		try{
			Map<String, String> result = new Map<String, String>();
			// {"entry":{"aspectNames":["cm:auditable"],"createdAt":"2020-10-12T07:50:54.542+0000","isFolder":true,"isFile":false,"createdByUser":{"id":"rubypoc","displayName":"rubypoc"},"modifiedAt":"2020-10-12T07:50:54.542+0000","modifiedByUser":{"id":"rubypoc","displayName":"rubypoc"},"name":"My Other Folder","id":"00ca4338-d1a1-4ba9-841a-f59b7a9a6250","nodeType":"cm:folder","parentId":"4a752972-e5a9-41d3-870f-f89201913a9d"}}

			//list<String> ids = new List<String>();
			//NodeResponse nodeResponse = new NodeResponse();

			//start
			Entry entry = new Entry();
			String parentNodeId = '5ad65c46-ca5e-468a-bd72-5eaef8c03ef2';
			FileInfo fileData = (FileInfo)JSON.deserialize(JSON.serialize(filesToInsert[0]), FileInfo.class);
			// create a file content
			String nodeId = CreateFloderOrFileNode(parentNodeId, fileData.title, 'cm:content');

			// Only consider a single file for now
			String uri = 'alfresco/api/-default-/public/alfresco/versions/1/nodes/' + nodeId + '/content?name=' + fileData.title;
			// get access token
			String token = getAuthorizationValue();

			Http http = new Http();
			HttpRequest request = new HttpRequest();
			request.setEndpoint(domain + uri);
			request.setMethod('PUT');
			request.setHeader('Content-Type', 'application/octet-stream');
			request.setHeader('Authorization', token);
			request.setHeader('Connection', 'keep-alive');
			request.setTimeout(120000);
			//System.debug('Authorization value: '+ token);
			// 将主体设置为JSON对象
			// request.setBody('{"name":"'+ fileData.Title +'","contentBodyUpdate":"'+ fileData.VersionData +'"}');
			//Blob blobFile = EncodingUtil.base64Decode(fileData.VersionData);
			request.setBodyAsBlob(fileData.versionData);
			HttpResponse response = http.send(request);

			return response.getBody();
			// 解析JSON响应
			// if (response.getStatusCode() != 201 || response.getStatusCode() != 200){
			//     //Convert REST response JSON to object
			//     System.debug('The status code returned is not what was expected: ' + response.getStatusCode()+'' + response.getStatus()+'body: ' + response.getBody());
			//     //return response.getBody();
			// } else{
			//     //Map<String, Object> m = (Map<String, Object>)JSON.deserializeUntyped(response.getBody());
			//     //Map<String, Object> o = (Map<String, Object>)m.get('entry');
			//     //String fileId = (String)o.get('id');
			//     //return fileId;
			//     // result.put('id',(String)o.get('id'));
			//     // result.put('title',(String)o.get('name'));
			//     // // return fildId;
			//     // // newFile.id = (String)o.get('id');

			//     //NodeResponse result = (NodeResponse)System.JSON.deserialize(response.getBody(), NodeResponse.class);
			//     //ds.add(result.entry.id);
			//     //System.debug(result.entry.id);
			//     //entry = result.Entry;
			//     //newFile = (FileInfo)JSON.deserialize(response.getBody(), FileInfo.class);

			// }

		} catch (Exception e){
			throw new AuraHandledException(e.getMessage()+' : ' + e.getStackTraceString());
		}
	}

	@AuraEnabled
	public static String downloadFileFromNode(String nodeId){
		String uri = 'alfresco/api/-default-/public/alfresco/versions/1/nodes/' + nodeId + '/content';
		// get access token
		String token = getAuthorizationValue();

		Http http = new Http();
		HttpRequest request = new HttpRequest();
		request.setEndpoint(domain + uri);
		request.setMethod('GET');
		// request.setHeader('Content-Type', 'application/octet-stream');
		request.setHeader('Authorization', token);
		// 将主体设置为JSON对象
		HttpResponse response = http.send(request);
		// 解析JSON响应
		if (response.getStatusCode() != 200){
			//Convert REST response JSON to object
			System.debug('The status code returned is not what was expected: ' + response.getStatusCode()+'' + response.getStatus());
			return response.getBody();
		} else{
			// Process file stream
			//System.debug('fileName: ' + response.getHeader('Content-Disposition').split(';')[1].split('filename=')[1]);
			return EncodingUtil.base64Encode((response.getBodyAsBlob()));
		}
		// System.debug('Body: '+ response);
		// RestContext.response.responseBody = response.getBodyAsBlob();
		//return EncodingUtil.base64Encode(response.getBodyAsBlob());
		//return response.getBodyAsBlob();
		// System.debug('Body: '+ response);
		// return response;
		//return response.getHeader();
		//return response.getBody();
	}

	@AuraEnabled
	public static Entry TestPrase(){
		String json = '{"entry":{"isFile":true,"createdByUser":{"id":"rubypoc","displayName":"rubypoc"},"modifiedAt":"2020-10-14T07:31:06.753+0000","nodeType":"cm:content","content":{"mimeType":"image/png","mimeTypeName":"PNG Image","sizeInBytes":443915,"encoding":"UTF-8"},"parentId":"5ad65c46-ca5e-468a-bd72-5eaef8c03ef2","aspectNames":["cm:titled","cm:auditable","cm:author","exif:exif"],"createdAt":"2020-10-14T04:34:28.575+0000","isFolder":false,"modifiedByUser":{"id":"rubypoc","displayName":"rubypoc"},"name":"Vlocity-Study.png","id":"9db81a14-0f62-4490-96d0-bf5e4c242ffe","properties":{"exif:pixelXDimension":1219,"exif:pixelYDimension":767}}}';
		NodeResponse result = (NodeResponse)System.JSON.deserialize(json, NodeResponse.class);
		//ds.add(result.entry.id);
		//System.debug(result.entry.id);
		return result.Entry;
		//return result.entry.id;
	}

	@AuraEnabled(cacheable = true)
	public static string ImageUrl(){
		//return 'http://13.228.73.46:8080/alfresco/s/api/node/workspace/SpacesStore/82eb6ac1-c47f-41fd-a659-581bb2f05ed4/content?alf_ticket='+getTicket();
		return 'http://dev.alfresco.com:8080/alfresco/s/api/node/workspace/SpacesStore/82eb6ac1-c47f-41fd-a659-581bb2f05ed4/content?alf_ticket='+getTicket();
	}
	
	@AuraEnabled(cacheable = true)
	public static FileInfo TestFileInfo(){
		FileInfo fileInfo = new FileInfo();
		fileInfo.title = 'Jessie Cai';
		return fileInfo;
	}

	public class FileInfo{
		@AuraEnabled
		public String id;
		@AuraEnabled
		public String title;
		@AuraEnabled
		public Blob versionData;
	}

	public class NodeResponse{
		@AuraEnabled
		public Entry entry;
	}

	public class Entry{
		@AuraEnabled
		public String createdAt;    //2020-10-13T11:21:09.021+0000
		@AuraEnabled
		public boolean isFolder;
		@AuraEnabled
		public boolean isFile;
		@AuraEnabled
		public String name;    //Jessie1.png
		@AuraEnabled
		public String id;    //9c1ec9b4-f7bb-4ccd-9a7e-2c5c1d4ed5b2
		@AuraEnabled
		public String nodeType;    //cm:content
		@AuraEnabled
		public Content content;
		@AuraEnabled
		public String parentId;    //58c5690b-3501-417e-ae11-3e9ed4ff999c
	}

	public class Content{
		@AuraEnabled
		public String mimeType;    //image/png
		@AuraEnabled
		public String mimeTypeName;    //PNG Image
		@AuraEnabled
		public Integer sizeInBytes;    //0
		@AuraEnabled
		public String encoding;
		//UTF-8
	}
}