public with sharing class QuotesClass {
    @AuraEnabled
    public static list<string> getQuotes(string category, integer count) {
     list<string> quotes = new list<string>();
     //configure the request and handle the response
     httpRequest request = new httpRequest();
     QuotesAPI__c quotesSetting = [SELECT endPoint__c, Key__c FROM QuotesAPI__c];
     request.setMethod('GET');
     request.setEndPoint(quotesSetting.endPoint__c + category + '&limit=' + count);
    
     request.setHeader('X-Api-Key', quotesSetting.Key__c);
     http http = new http();
       
         httpResponse response = http.send(request);
     
     
    
     //if the response is received 
     if(response.getStatusCode() == 200) {
      string jsonResponse = response.getBody();
      list<object> quotesObj = (list<object>)JSON.deserializeUntyped(jsonResponse);
  
      
         for(object qob : quotesObj) {
             map<string,object> quotesMap = (map<string,object>) qob;
             string theQuote = (string)quotesMap.get('quote');
              string theAuthor = (string)quotesMap.get('author');
             string complete = theQuote + ' - ' + theAuthor; 
             quotes.add(complete);
             
         }
     }
   
  
     return quotes;
    }
  }