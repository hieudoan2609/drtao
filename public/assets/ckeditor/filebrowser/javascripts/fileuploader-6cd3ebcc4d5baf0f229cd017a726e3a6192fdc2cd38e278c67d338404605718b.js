var qq=qq||{};qq.extend=function(e,t){for(var n in t)e[n]=t[n]},qq.indexOf=function(e,t,n){if(e.indexOf)return e.indexOf(t,n);n=n||0;var i=e.length;for(n<0&&(n+=i);n<i;n++)if(n in e&&e[n]===t)return n;return-1},qq.getUniqueId=function(){var e=0;return function(){return e++}}(),qq.attach=function(e,t,n){e.addEventListener?e.addEventListener(t,n,!1):e.attachEvent&&e.attachEvent("on"+t,n)},qq.detach=function(e,t,n){e.removeEventListener?e.removeEventListener(t,n,!1):e.attachEvent&&e.detachEvent("on"+t,n)},qq.preventDefault=function(e){e.preventDefault?e.preventDefault():e.returnValue=!1},qq.insertBefore=function(e,t){t.parentNode.insertBefore(e,t)},qq.remove=function(e){e.parentNode.removeChild(e)},qq.contains=function(e,t){return e==t||(e.contains?e.contains(t):!!(8&t.compareDocumentPosition(e)))},qq.toElement=function(){var e=document.createElement("div");return function(t){e.innerHTML=t;var n=e.firstChild;return e.removeChild(n),n}}(),qq.css=function(e,t){null!=t.opacity&&"string"!=typeof e.style.opacity&&"undefined"!=typeof e.filters&&(t.filter="alpha(opacity="+Math.round(100*t.opacity)+")"),qq.extend(e.style,t)},qq.hasClass=function(e,t){return new RegExp("(^| )"+t+"( |$)").test(e.className)},qq.addClass=function(e,t){qq.hasClass(e,t)||(e.className+=" "+t)},qq.removeClass=function(e,t){var n=new RegExp("(^| )"+t+"( |$)");e.className=e.className.replace(n," ").replace(/^\s+|\s+$/g,"")},qq.setText=function(e,t){e.innerText=t,e.textContent=t},qq.children=function(e){for(var t=[],n=e.firstChild;n;)1==n.nodeType&&t.push(n),n=n.nextSibling;return t},qq.getByClass=function(e,t){if(e.querySelectorAll)return e.querySelectorAll("."+t);for(var n=[],i=e.getElementsByTagName("*"),o=i.length,s=0;s<o;s++)qq.hasClass(i[s],t)&&n.push(i[s]);return n},qq.obj2url=function(e,t,n){var i=[],o="&",s=function(e,n){var o=t?/\[\]$/.test(t)?t:t+"["+n+"]":n;"undefined"!=o&&"undefined"!=n&&i.push("object"==typeof e?qq.obj2url(e,o,!0):"[object Function]"===Object.prototype.toString.call(e)?encodeURIComponent(o)+"="+encodeURIComponent(e()):encodeURIComponent(o)+"="+encodeURIComponent(e))};if(!n&&t)o=/\?/.test(t)?/\?$/.test(t)?"":"&":"?",i.push(t),i.push(qq.obj2url(e));else if("[object Array]"===Object.prototype.toString.call(e)&&void 0!==e)for(var a=0,r=e.length;a<r;++a)s(e[a],a);else if(void 0!==e&&null!==e&&"object"==typeof e)for(var a in e)s(e[a],a);else i.push(encodeURIComponent(t)+"="+encodeURIComponent(e));return i.join(o).replace(/^&/,"").replace(/%20/g,"+")};var qq=qq||{};qq.FileUploaderBasic=function(e){this._options={debug:!1,action:"/server/upload",params:{},button:null,multiple:!0,maxConnections:3,method:"POST",fieldName:"qqfile",allowedExtensions:[],sizeLimit:0,minSizeLimit:0,maxFilesCount:0,minFilesCount:0,onSubmit:function(){},onProgress:function(){},onComplete:function(){},onCancel:function(){},messages:{typeError:"{file} has invalid extension. Only {extensions} are allowed.",sizeError:"{file} is too large, maximum file size is {sizeLimit}.",minSizeError:"{file} is too small, minimum file size is {minSizeLimit}.",emptyError:"{file} is empty, please select files again without it.",onLeave:"The files are being uploaded, if you leave now the upload will be cancelled.",maxFilesError:"You must select less then {maxFilesCount} files.",minFilesError:"You must select more then {minFilesCount} files."},showMessage:function(e){alert(e)}},qq.extend(this._options,e),this._filesInProgress=0,this._filesUploaded=0,this._handler=this._createUploadHandler(),this._options.button&&(this._button=this._createUploadButton(this._options.button)),this._preventLeaveInProgress()},qq.FileUploaderBasic.prototype={setParams:function(e){this._options.params=e},getInProgress:function(){return this._filesInProgress},_createUploadButton:function(e){var t=this;return new qq.UploadButton({element:e,multiple:this._options.multiple&&qq.UploadHandlerXhr.isSupported(),onChange:function(e){t._onInputChange(e)}})},_createUploadHandler:function(){var e,t=this;return e=qq.UploadHandlerXhr.isSupported()?"UploadHandlerXhr":"UploadHandlerForm",new qq[e]({debug:this._options.debug,action:this._options.action,maxConnections:this._options.maxConnections,fieldName:this._options.fieldName,method:this._options.method,onProgress:function(e,n,i,o){t._onProgress(e,n,i,o),t._options.onProgress(e,n,i,o)},onComplete:function(e,n,i){t._onComplete(e,n,i),t._options.onComplete(e,n,i)},onCancel:function(e,n){t._onCancel(e,n),t._options.onCancel(e,n)}})},_preventLeaveInProgress:function(){var e=this;qq.attach(window,"beforeunload",function(t){if(e._filesInProgress)return(t=t||window.event).returnValue=e._options.messages.onLeave,e._options.messages.onLeave})},_onSubmit:function(){this._filesInProgress++},_onProgress:function(){},_onComplete:function(e,t,n){this._filesInProgress--,n.error?this._options.showMessage(n.error):this._filesUploaded++},_onCancel:function(){this._filesInProgress--},_onInputChange:function(e){this._handler instanceof qq.UploadHandlerXhr?this._uploadFileList(e.files):this._validateFile(e)&&this._uploadFile(e),this._button.reset()},_uploadFileList:function(e){if(this._validateFiles(e))for(var t=0;t<e.length;t++)this._uploadFile(e[t])},_uploadFile:function(e){var t=this._handler.add(e),n=this._handler.getName(t);!1!==this._options.onSubmit(t,n)&&(this._onSubmit(t,n),this._handler.upload(t,this._options.params))},_validateFiles:function(e){var t=this._filesUploaded+e.length;if(this._options.maxFilesCount>0&&t>this._options.maxFilesCount)return this._error("maxFilesError","name"),!1;if(this._options.minFilesCount>0&&t<this._options.minFilesCount)return this._error("minFilesError","name"),!1;for(var n=0;n<e.length;n++)if(!this._validateFile(e[n]))return!1;return!0},_validateFile:function(e){var t,n;return e.value?t=e.value.replace(/.*(\/|\\)/,""):(t=null!=e.fileName?e.fileName:e.name,n=null!=e.fileSize?e.fileSize:e.size),this._isAllowedExtension(t)?0===n?(this._error("emptyError",t),!1):n&&this._options.sizeLimit&&n>this._options.sizeLimit?(this._error("sizeError",t),!1):!(n&&n<this._options.minSizeLimit)||(this._error("minSizeError",t),!1):(this._error("typeError",t),!1)},_error:function(e,t){function n(e,t){i=i.replace(e,t)}var i=this._options.messages[e];n("{file}",this._formatFileName(t)),n("{extensions}",this._options.allowedExtensions.join(", ")),n("{sizeLimit}",this._formatSize(this._options.sizeLimit)),n("{minSizeLimit}",this._formatSize(this._options.minSizeLimit)),n("{maxFilesCount}",this._options.maxFilesCount),n("{minFilesCount}",this._options.minFilesCount),this._options.showMessage(i)},_formatFileName:function(e){return e.length>33&&(e=e.slice(0,19)+"..."+e.slice(-13)),e},_isAllowedExtension:function(e){var t=-1!==e.indexOf(".")?e.replace(/.*[.]/,"").toLowerCase():"",n=this._options.allowedExtensions;if(!n.length)return!0;for(var i=0;i<n.length;i++)if(n[i].toLowerCase()==t)return!0;return!1},_formatSize:function(e){var t=-1;do{e/=1024,t++}while(e>99);return Math.max(e,.1).toFixed(1)+["kB","MB","GB","TB","PB","EB"][t]}},qq.FileUploader=function(e){qq.FileUploaderBasic.apply(this,arguments),qq.extend(this._options,{element:null,listElement:null,template:'<div class="qq-uploader"><div class="qq-upload-drop-area"><span>Drop files here to upload</span></div><div class="qq-upload-button">Upload a file</div><ul class="qq-upload-list"></ul></div>',fileTemplate:'<li><span class="qq-upload-file"></span><span class="qq-upload-spinner"></span><span class="qq-upload-size"></span><a class="qq-upload-cancel" href="#">Cancel</a><span class="qq-upload-failed-text">Failed</span></li>',classes:{button:"qq-upload-button",drop:"qq-upload-drop-area",dropActive:"qq-upload-drop-area-active",list:"qq-upload-list",file:"qq-upload-file",spinner:"qq-upload-spinner",size:"qq-upload-size",cancel:"qq-upload-cancel",success:"qq-upload-success",fail:"qq-upload-fail"}}),qq.extend(this._options,e),this._element=this._options.element,this._element.innerHTML=this._options.template,this._listElement=this._options.listElement||this._find(this._element,"list"),this._classes=this._options.classes,this._button=this._createUploadButton(this._find(this._element,"button")),this._bindCancelEvent(),this._setupDragDrop()},qq.extend(qq.FileUploader.prototype,qq.FileUploaderBasic.prototype),qq.extend(qq.FileUploader.prototype,{_find:function(e,t){var n=qq.getByClass(e,this._options.classes[t])[0];if(!n)throw new Error("element not found "+t);return n},_setupDragDrop:function(){var e=this,t=this._find(this._element,"drop"),n=new qq.UploadDropZone({element:t,onEnter:function(n){qq.addClass(t,e._classes.dropActive),n.stopPropagation()},onLeave:function(e){e.stopPropagation()},onLeaveNotDescendants:function(){qq.removeClass(t,e._classes.dropActive)},onDrop:function(n){t.style.display="none",qq.removeClass(t,e._classes.dropActive),e._uploadFileList(n.dataTransfer.files)}});t.style.display="none",qq.attach(document,"dragenter",function(e){n._isValidFileDrag(e)&&(t.style.display="block")}),qq.attach(document,"dragleave",function(e){if(n._isValidFileDrag(e)){var i=document.elementFromPoint(e.clientX,e.clientY);i&&"HTML"!=i.nodeName||(t.style.display="none")}})},_onSubmit:function(e,t){qq.FileUploaderBasic.prototype._onSubmit.apply(this,arguments),this._addToList(e,t)},_onProgress:function(e,t,n,i){qq.FileUploaderBasic.prototype._onProgress.apply(this,arguments);var o,s=this._getItemByFileId(e),a=this._find(s,"size");a.style.display="inline",o=n!=i?Math.round(n/i*100)+"% from "+this._formatSize(i):this._formatSize(i),qq.setText(a,o)},_onComplete:function(e,t,n){qq.FileUploaderBasic.prototype._onComplete.apply(this,arguments);var i=this._getItemByFileId(e);qq.remove(this._find(i,"cancel")),qq.remove(this._find(i,"spinner")),n.success?qq.addClass(i,this._classes.success):qq.addClass(i,this._classes.fail)},_addToList:function(e,t){var n=qq.toElement(this._options.fileTemplate);n.qqFileId=e;var i=this._find(n,"file");qq.setText(i,this._formatFileName(t)),this._find(n,"size").style.display="none",this._listElement.appendChild(n)},_getItemByFileId:function(e){for(var t=this._listElement.firstChild;t;){if(t.qqFileId==e)return t;t=t.nextSibling}},_bindCancelEvent:function(){var e=this,t=this._listElement;qq.attach(t,"click",function(t){var n=(t=t||window.event).target||t.srcElement;if(qq.hasClass(n,e._classes.cancel)){qq.preventDefault(t);var i=n.parentNode;e._handler.cancel(i.qqFileId),qq.remove(i)}})}}),qq.UploadDropZone=function(e){this._options={element:null,onEnter:function(){},onLeave:function(){},onLeaveNotDescendants:function(){},onDrop:function(){}},qq.extend(this._options,e),this._element=this._options.element,this._disableDropOutside(),this._attachEvents()},qq.UploadDropZone.prototype={_disableDropOutside:function(){qq.UploadDropZone.dropOutsideDisabled||(qq.attach(document,"dragover",function(e){e.dataTransfer&&(e.dataTransfer.dropEffect="none",e.preventDefault())}),qq.UploadDropZone.dropOutsideDisabled=!0)},_attachEvents:function(){var e=this;qq.attach(e._element,"dragover",function(t){if(e._isValidFileDrag(t)){var n=t.dataTransfer.effectAllowed;t.dataTransfer.dropEffect="move"==n||"linkMove"==n?"move":"copy",t.stopPropagation(),t.preventDefault()}}),qq.attach(e._element,"dragenter",function(t){e._isValidFileDrag(t)&&e._options.onEnter(t)}),qq.attach(e._element,"dragleave",function(t){if(e._isValidFileDrag(t)){e._options.onLeave(t);var n=document.elementFromPoint(t.clientX,t.clientY);qq.contains(this,n)||e._options.onLeaveNotDescendants(t)}}),qq.attach(e._element,"drop",function(t){e._isValidFileDrag(t)&&(t.preventDefault(),e._options.onDrop(t))})},_isValidFileDrag:function(e){var t=e.dataTransfer,n=navigator.userAgent.indexOf("AppleWebKit")>-1;return t&&"none"!=t.effectAllowed&&(t.files||!n&&t.types.contains&&t.types.contains("Files"))}},qq.UploadButton=function(e){this._options={element:null,multiple:!1,name:"file",onChange:function(){},hoverClass:"qq-upload-button-hover",focusClass:"qq-upload-button-focus"},qq.extend(this._options,e),this._element=this._options.element,qq.css(this._element,{position:"relative",overflow:"hidden",direction:"ltr"}),this._input=this._createInput()},qq.UploadButton.prototype={getInput:function(){return this._input},reset:function(){this._input.parentNode&&qq.remove(this._input),qq.removeClass(this._element,this._options.focusClass),this._input=this._createInput()},_createInput:function(){var e=document.createElement("input");this._options.multiple&&e.setAttribute("multiple","multiple"),e.setAttribute("type","file"),e.setAttribute("name",this._options.name),qq.css(e,{position:"absolute",right:0,top:0,fontFamily:"Arial",fontSize:"118px",margin:0,padding:0,cursor:"pointer",opacity:0}),this._element.appendChild(e);var t=this;return qq.attach(e,"change",function(){t._options.onChange(e)}),qq.attach(e,"mouseover",function(){qq.addClass(t._element,t._options.hoverClass)}),qq.attach(e,"mouseout",function(){qq.removeClass(t._element,t._options.hoverClass)}),qq.attach(e,"focus",function(){qq.addClass(t._element,t._options.focusClass)}),qq.attach(e,"blur",function(){qq.removeClass(t._element,t._options.focusClass)}),window.attachEvent&&e.setAttribute("tabIndex","-1"),e}},qq.UploadHandlerAbstract=function(e){this._options={debug:!1,action:"/upload.php",method:"POST",fieldName:"qqfile",maxConnections:999,onProgress:function(){},onComplete:function(){},onCancel:function(){}},qq.extend(this._options,e),this._queue=[],this._params=[]},qq.UploadHandlerAbstract.prototype={log:function(e){this._options.debug&&window.console&&console.log("[uploader] "+e)},add:function(){},upload:function(e,t){var n=this._queue.push(e),i={};qq.extend(i,t),this._params[e]=i,n<=this._options.maxConnections&&this._upload(e,this._params[e])},cancel:function(e){this._cancel(e),this._dequeue(e)},cancelAll:function(){for(var e=0;e<this._queue.length;e++)this._cancel(this._queue[e]);this._queue=[]},getName:function(){},getSize:function(){},getQueue:function(){return this._queue},_upload:function(){},_cancel:function(){},_dequeue:function(e){var t=qq.indexOf(this._queue,e);this._queue.splice(t,1);var n=this._options.maxConnections;if(this._queue.length>=n&&t<n){var i=this._queue[n-1];this._upload(i,this._params[i])}}},qq.UploadHandlerForm=function(){qq.UploadHandlerAbstract.apply(this,arguments),this._inputs={}},qq.extend(qq.UploadHandlerForm.prototype,qq.UploadHandlerAbstract.prototype),qq.extend(qq.UploadHandlerForm.prototype,{add:function(e){e.setAttribute("name",this._options.fieldName);var t="qq-upload-handler-iframe"+qq.getUniqueId();return this._inputs[t]=e,e.parentNode&&qq.remove(e),t},getName:function(e){return this._inputs[e].value.replace(/.*(\/|\\)/,"")},_cancel:function(e){this._options.onCancel(e,this.getName(e)),delete this._inputs[e];var t=document.getElementById(e);t&&(t.setAttribute("src","javascript:false;"),qq.remove(t))},_upload:function(e,t){var n=this._inputs[e];if(!n)throw new Error("file with passed id was not added, or already uploaded or cancelled");var i=this.getName(e),o=this._createIframe(e),s=this._createForm(o,t);s.appendChild(n);var a=this;return this._attachLoadEvent(o,function(){a.log("iframe loaded");var t=a._getIframeContentJSON(o);a._options.onComplete(e,i,t),a._dequeue(e),delete a._inputs[e],setTimeout(function(){qq.remove(o)},1)}),s.submit(),qq.remove(s),e},_attachLoadEvent:function(e,t){qq.attach(e,"load",function(){e.parentNode&&(e.contentDocument&&e.contentDocument.body&&"false"==e.contentDocument.body.innerHTML||t())})},_getIframeContentJSON:function(iframe){var doc=iframe.contentDocument?iframe.contentDocument:iframe.contentWindow.document,response;this.log("converting iframe's innerHTML to JSON"),this.log("innerHTML = "+doc.body.innerHTML);try{response=eval("("+doc.body.innerHTML+")")}catch(err){response={}}return response},_createIframe:function(e){var t=qq.toElement('<iframe src="javascript:false;" name="'+e+'" />');return t.setAttribute("id",e),t.style.display="none",document.body.appendChild(t),t},_createForm:function(e,t){var n=qq.toElement('<form enctype="multipart/form-data"></form>'),i=qq.obj2url(t,this._options.action);n.setAttribute("method",this._options.method),n.setAttribute("action",i),n.setAttribute("target",e.name),n.style.display="none";var o=$('meta[name="csrf-token"]').attr("content"),s=$('meta[name="csrf-param"]').attr("content"),a=qq.toElement('<input type="hidden" />');return a.setAttribute("name",s),a.setAttribute("value",o),n.appendChild(a),document.body.appendChild(n),n}}),qq.UploadHandlerXhr=function(){qq.UploadHandlerAbstract.apply(this,arguments),this._files=[],this._xhrs=[],this._loaded=[]},qq.UploadHandlerXhr.isSupported=function(){var e=document.createElement("input");return e.type="file","multiple"in e&&"undefined"!=typeof File&&"undefined"!=typeof(new XMLHttpRequest).upload},qq.extend(qq.UploadHandlerXhr.prototype,qq.UploadHandlerAbstract.prototype),qq.extend(qq.UploadHandlerXhr.prototype,{add:function(e){if(!(e instanceof File))throw new Error("Passed obj in not a File (in qq.UploadHandlerXhr)");return this._files.push(e)-1},getName:function(e){var t=this._files[e];return null!=t.fileName?t.fileName:t.name},getSize:function(e){var t=this._files[e];return null!=t.fileSize?t.fileSize:t.size},getLoaded:function(e){return this._loaded[e]||0},_upload:function(e,t){var n=this._files[e],i=this.getName(e),o=this.getSize(e);this._loaded[e]=0;var s=this._xhrs[e]=new XMLHttpRequest,a=this;s.upload.onprogress=function(t){t.lengthComputable&&(a._loaded[e]=t.loaded,a._options.onProgress(e,i,t.loaded,t.total))},s.onreadystatechange=function(){4==s.readyState&&a._onComplete(e,s)},(t=t||{})[this._options.fieldName]=i;var r=qq.obj2url(t,this._options.action);s.open(this._options.method,r,!0),s.setRequestHeader("X-Requested-With","XMLHttpRequest"),s.setRequestHeader("X-File-Name",encodeURIComponent(i)),s.setRequestHeader("X-File-Size",o),s.setRequestHeader("X-File-Type",n.type),s.setRequestHeader("Content-Type","application/octet-stream"),$.rails&&$.rails.CSRFProtection(s),s.send(n)},_onComplete:function(id,xhr){if(this._files[id]){var name=this.getName(id),size=this.getSize(id);if(this._options.onProgress(id,name,size,size),[200,201].indexOf(xhr.status)>-1){var response;this.log("xhr - server response received"),this.log("responseText = "+xhr.responseText);try{response=eval("("+xhr.responseText+")")}catch(err){response={}}this._options.onComplete(id,name,response)}else this._options.onComplete(id,name,{});this._files[id]=null,this._xhrs[id]=null,this._dequeue(id)}},_cancel:function(e){this._options.onCancel(e,this.getName(e)),this._files[e]=null,this._xhrs[e]&&(this._xhrs[e].abort(),this._xhrs[e]=null)}});