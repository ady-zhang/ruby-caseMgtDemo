public with sharing class CaseService {
  @AuraEnabled(cacheable=true)
  public static List<Map<String, Object>> getCaseList(
    Map<String, Object> filterMap
  ) {
    List<Map<String, Object>> castList = new List<Map<String, Object>>();
    if(filterMap.get('caseNum') == 'abc'){
        Map<String,Object> testMap = new Map<String, Object>();
        testMap.put('test', 'abcd');
        castList.add(testMap);
    }
    return castList;
  }
}
