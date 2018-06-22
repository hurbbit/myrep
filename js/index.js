function ajax(){ 
    var ajaxData = { 
      type:arguments[0].type || "GET", 
      url:arguments[0].url || "", 
      async:arguments[0].async || "false", 
      data:arguments[0].data || null, 
      dataType:arguments[0].dataType || "text", 
      contentType:arguments[0].contentType || "application/x-www-form-urlencoded", 
      beforeSend:arguments[0].beforeSend || function(){}, 
      success:arguments[0].success || function(){}, 
      error:arguments[0].error || function(){} 
    } 
    ajaxData.beforeSend() 
    var xhr = createxmlHttpRequest();  
    xhr.responseType=ajaxData.dataType; 
    xhr.open(ajaxData.type,ajaxData.url,ajaxData.async);  
    xhr.setRequestHeader("Content-Type",ajaxData.contentType); 
    xhr.send(convertData(ajaxData.data));  
    xhr.onreadystatechange = function() {  
      if (xhr.readyState == 4) {  
        if(xhr.status == 200){ 
          ajaxData.success(xhr.response) 
        }else{ 
          ajaxData.error() 
        }  
      } 
    }  
  } 
    
  function createxmlHttpRequest() {  
    if (window.ActiveXObject) {  
      return new ActiveXObject("Microsoft.XMLHTTP");  
    } else if (window.XMLHttpRequest) {  
      return new XMLHttpRequest();  
    }  
  } 
    
  function convertData(data){ 
    if( typeof data === 'object' ){ 
      var convertResult = "" ;  
      for(var c in data){  
        convertResult+= c + "=" + data[c] + "&";  
      }  
      convertResult=convertResult.substring(0,convertResult.length-1) 
      return convertResult; 
    }else{ 
      return data; 
    } 
  }
  
  function getValue(id) {
    var dom = document.getElementById(id);
    return dom.value.trim() || '';
  }
  
  function sendForm() {
    var username = getValue('username');
    var phone = getValue('phone');
    var position = getValue('position');
    ajax({ 
      type: 'POST', 
      url: 'https://m.jianke.com/ask/activity', 
      dataType: 'json',
      contentType: 'application/x-www-form-urlencoded',
      data: {
        username,
        phone,
        position,
      },
      processData:false,
      success:function(msg){ 
        console.log(msg);
        if (msg && msg.errcode === '0') {
          alert('提交成功');
        } else {
          alert(msg.errmessage);
        }
      }, 
      error:function(err){ 
        console.log("error");
        console.log(err);
      } 
    })
  }