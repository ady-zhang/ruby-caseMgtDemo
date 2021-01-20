public with sharing class AdminDataService {
  @AuraEnabled(cacheable=true)
  public static List<SR_Admin_Data__c> getAdminDataList(
    String adminCode,
    String description
  ) {
    String filterAdminCode = '%';
    if (String.isNotEmpty(adminCode)) {
      filterAdminCode = '%' + adminCode + '%';
    }
    String filtrDescription = '%';
    if (String.isNotEmpty(description)) {
      filtrDescription = '%' + description + '%';
    }
    List<SR_Admin_Data__c> adminCodeList = [
      SELECT
        Id,
        Name,
        Description__c,
        Language__c,
        Admin_Code_Master__c,
        Delete_Indicator__c,
        CreatedById,
        LastModifiedById,
        OwnerId
      FROM SR_Admin_Data__c
      WHERE
        (Admin_Code_Master__c = NULL
        OR Admin_Code_Master__c = 'KEYN')
        AND Name LIKE :filterAdminCode
        AND Description__c LIKE :filtrDescription
      WITH SECURITY_ENFORCED
      ORDER BY Name, Language__c
    ];
    return adminCodeList;
  }

  @AuraEnabled(cacheable=true)
  public static List<SR_Admin_Data__c> getAdminDataChildren(
    String adminCode,
    String description
  ) {
    String filterAdminCode = '%';
    if (String.isNotEmpty(adminCode)) {
      filterAdminCode = '%' + adminCode + '%';
    }
    String filtrDescription = '%';
    if (String.isNotEmpty(description)) {
      filtrDescription = '%' + description + '%';
    }
    List<SR_Admin_Data__c> adminCodeList = [
      SELECT
        Id,
        Name,
        Description__c,
        Language__c,
        Admin_Code_Master__c,
        Delete_Indicator__c,
        CreatedById,
        LastModifiedById,
        OwnerId
      FROM SR_Admin_Data__c
      WHERE
        Admin_Code_Master__c != NULL
        AND Admin_Code_Master__c != 'KEYN'
        AND Name LIKE :filterAdminCode
        AND Description__c LIKE :filtrDescription
      WITH SECURITY_ENFORCED
      ORDER BY Name, Language__c
    ];
    return adminCodeList;
  }

  @AuraEnabled(cacheable=true)
  public static Map<String, Object> getAdminDataByCode(
    String acMaster,
    String adminCode
  ) {
    Map<String, Object> dataMap = new Map<String, Object>();
    //TODO get Data from DB...
    dataMap.put('testData', 'Test Data');
    return dataMap;
  }
}
