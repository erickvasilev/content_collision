window.onload = function(){

	
   var fragment = '<br/><input type="file" id="file-chooser" /><button id="upload-button">Upload to S3</button><div id="results" style="font-family: sans-serif;"></div>';	
   var content = document.getElementById("content");
   content.insertAdjacentHTML( 'beforeend', fragment );
   
                    
  
    var fileChooser = document.getElementById('file-chooser');
	    var button = document.getElementById('upload-button');
	    var results = document.getElementById('results');
	    button.addEventListener('click', function () {
	        results.innerHTML = ("<br/>Loading...");
	        var file = fileChooser.files[0];
	        if (file) {
	        
	        if( file.type != 'image/jpeg'){
	        results.innerHTML = '<br/>Only file with JPG extention allowed';
	        throw new Error("Only file with JPG extention allowed");
	        }

		            AWS.config.update({
		                "accessKeyId": "AKIAIEEHPO37MH6ZRLMA",
		                "secretAccessKey": "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",
		                "region": "ap-southeast-1"
		            });
		            var s3 = new AWS.S3();
        	        
        	        s3.getSignedUrl('putObject', {
				            Bucket: 'contentcollision',
					    Key: file.name,
					    ContentType: file.type,
					    ACL: 'authenticated-read',
					}, function (err, signedurl) {
					
					     
					     
					      $.ajax({
					      type: 'PUT',
					      url: signedurl,
					      
					      contentType: file.type,
					      
					      processData: false,
					      
					      data: file,
					      success:function () {
					      
							      results.innerHTML = ("<br/>Successfully uploaded data");
						                 
						                    
						                s3.getSignedUrl('getObject', {
							    	Bucket: 'contentcollision',
								    Key: file.name
								}, function (err, url) {
								    results.innerHTML = ("<p><font color='blue'>Successfully uploaded data to: <br/><a href='" + url +"' target='_blank'>" + url +"</a></font></p>");
								});  

					       }
						  });


					});



	        } else {
	            results.innerHTML = '<br/>Please add file.';
	        }
	    }, false);
};
