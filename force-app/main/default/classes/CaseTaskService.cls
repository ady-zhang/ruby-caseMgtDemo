public with sharing class CaseTaskService {
  @AuraEnabled(cacheable=true)
  public static List<Map<String, Object>> getTaskList(
    String caseNum,
    String subCaseNum
  ) {
    List<Map<String, Object>> castList = new List<Map<String, Object>>();

    Map<String, Object> testMap = new Map<String, Object>();
    testMap.put('test', 'abcd');
    castList.add(testMap);

    return castList;
  }
}
