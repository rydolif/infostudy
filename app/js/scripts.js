/*! jQuery Validation Plugin - v1.15.1 - 7/22/2016
 * http://jqueryvalidation.org/
 * Copyright (c) 2016 Jörn Zaefferer; Licensed MIT */
!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):"object"==typeof module&&module.exports?module.exports=a(require("jquery")):a(jQuery)}(function(a){a.extend(a.fn,{validate:function(b){if(!this.length)return void(b&&b.debug&&window.console&&console.warn("Nothing selected, can't validate, returning nothing."));var c=a.data(this[0],"validator");return c?c:(this.attr("novalidate","novalidate"),c=new a.validator(b,this[0]),a.data(this[0],"validator",c),c.settings.onsubmit&&(this.on("click.validate",":submit",function(b){c.settings.submitHandler&&(c.submitButton=b.target),a(this).hasClass("cancel")&&(c.cancelSubmit=!0),void 0!==a(this).attr("formnovalidate")&&(c.cancelSubmit=!0)}),this.on("submit.validate",function(b){function d(){var d,e;return!c.settings.submitHandler||(c.submitButton&&(d=a("<input type='hidden'/>").attr("name",c.submitButton.name).val(a(c.submitButton).val()).appendTo(c.currentForm)),e=c.settings.submitHandler.call(c,c.currentForm,b),c.submitButton&&d.remove(),void 0!==e&&e)}return c.settings.debug&&b.preventDefault(),c.cancelSubmit?(c.cancelSubmit=!1,d()):c.form()?c.pendingRequest?(c.formSubmitted=!0,!1):d():(c.focusInvalid(),!1)})),c)},valid:function(){var b,c,d;return a(this[0]).is("form")?b=this.validate().form():(d=[],b=!0,c=a(this[0].form).validate(),this.each(function(){b=c.element(this)&&b,b||(d=d.concat(c.errorList))}),c.errorList=d),b},rules:function(b,c){var d,e,f,g,h,i,j=this[0];if(null!=j&&null!=j.form){if(b)switch(d=a.data(j.form,"validator").settings,e=d.rules,f=a.validator.staticRules(j),b){case"add":a.extend(f,a.validator.normalizeRule(c)),delete f.messages,e[j.name]=f,c.messages&&(d.messages[j.name]=a.extend(d.messages[j.name],c.messages));break;case"remove":return c?(i={},a.each(c.split(/\s/),function(b,c){i[c]=f[c],delete f[c],"required"===c&&a(j).removeAttr("aria-required")}),i):(delete e[j.name],f)}return g=a.validator.normalizeRules(a.extend({},a.validator.classRules(j),a.validator.attributeRules(j),a.validator.dataRules(j),a.validator.staticRules(j)),j),g.required&&(h=g.required,delete g.required,g=a.extend({required:h},g),a(j).attr("aria-required","true")),g.remote&&(h=g.remote,delete g.remote,g=a.extend(g,{remote:h})),g}}}),a.extend(a.expr[":"],{blank:function(b){return!a.trim(""+a(b).val())},filled:function(b){var c=a(b).val();return null!==c&&!!a.trim(""+c)},unchecked:function(b){return!a(b).prop("checked")}}),a.validator=function(b,c){this.settings=a.extend(!0,{},a.validator.defaults,b),this.currentForm=c,this.init()},a.validator.format=function(b,c){return 1===arguments.length?function(){var c=a.makeArray(arguments);return c.unshift(b),a.validator.format.apply(this,c)}:void 0===c?b:(arguments.length>2&&c.constructor!==Array&&(c=a.makeArray(arguments).slice(1)),c.constructor!==Array&&(c=[c]),a.each(c,function(a,c){b=b.replace(new RegExp("\\{"+a+"\\}","g"),function(){return c})}),b)},a.extend(a.validator,{defaults:{messages:{},groups:{},rules:{},errorClass:"error",pendingClass:"pending",validClass:"valid",errorElement:"label",focusCleanup:!1,focusInvalid:!0,errorContainer:a([]),errorLabelContainer:a([]),onsubmit:!0,ignore:":hidden",ignoreTitle:!1,onfocusin:function(a){this.lastActive=a,this.settings.focusCleanup&&(this.settings.unhighlight&&this.settings.unhighlight.call(this,a,this.settings.errorClass,this.settings.validClass),this.hideThese(this.errorsFor(a)))},onfocusout:function(a){this.checkable(a)||!(a.name in this.submitted)&&this.optional(a)||this.element(a)},onkeyup:function(b,c){var d=[16,17,18,20,35,36,37,38,39,40,45,144,225];9===c.which&&""===this.elementValue(b)||a.inArray(c.keyCode,d)!==-1||(b.name in this.submitted||b.name in this.invalid)&&this.element(b)},onclick:function(a){a.name in this.submitted?this.element(a):a.parentNode.name in this.submitted&&this.element(a.parentNode)},highlight:function(b,c,d){"radio"===b.type?this.findByName(b.name).addClass(c).removeClass(d):a(b).addClass(c).removeClass(d)},unhighlight:function(b,c,d){"radio"===b.type?this.findByName(b.name).removeClass(c).addClass(d):a(b).removeClass(c).addClass(d)}},setDefaults:function(b){a.extend(a.validator.defaults,b)},messages:{required:"This field is required.",remote:"Please fix this field.",email:"Please enter a valid email address.",url:"Please enter a valid URL.",date:"Please enter a valid date.",dateISO:"Please enter a valid date (ISO).",number:"Please enter a valid number.",digits:"Please enter only digits.",equalTo:"Please enter the same value again.",maxlength:a.validator.format("Please enter no more than {0} characters."),minlength:a.validator.format("Please enter at least {0} characters."),rangelength:a.validator.format("Please enter a value between {0} and {1} characters long."),range:a.validator.format("Please enter a value between {0} and {1}."),max:a.validator.format("Please enter a value less than or equal to {0}."),min:a.validator.format("Please enter a value greater than or equal to {0}."),step:a.validator.format("Please enter a multiple of {0}.")},autoCreateRanges:!1,prototype:{init:function(){function b(b){!this.form&&this.hasAttribute("contenteditable")&&(this.form=a(this).closest("form")[0]);var c=a.data(this.form,"validator"),d="on"+b.type.replace(/^validate/,""),e=c.settings;e[d]&&!a(this).is(e.ignore)&&e[d].call(c,this,b)}this.labelContainer=a(this.settings.errorLabelContainer),this.errorContext=this.labelContainer.length&&this.labelContainer||a(this.currentForm),this.containers=a(this.settings.errorContainer).add(this.settings.errorLabelContainer),this.submitted={},this.valueCache={},this.pendingRequest=0,this.pending={},this.invalid={},this.reset();var c,d=this.groups={};a.each(this.settings.groups,function(b,c){"string"==typeof c&&(c=c.split(/\s/)),a.each(c,function(a,c){d[c]=b})}),c=this.settings.rules,a.each(c,function(b,d){c[b]=a.validator.normalizeRule(d)}),a(this.currentForm).on("focusin.validate focusout.validate keyup.validate",":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'], [type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'], [type='radio'], [type='checkbox'], [contenteditable]",b).on("click.validate","select, option, [type='radio'], [type='checkbox']",b),this.settings.invalidHandler&&a(this.currentForm).on("invalid-form.validate",this.settings.invalidHandler),a(this.currentForm).find("[required], [data-rule-required], .required").attr("aria-required","true")},form:function(){return this.checkForm(),a.extend(this.submitted,this.errorMap),this.invalid=a.extend({},this.errorMap),this.valid()||a(this.currentForm).triggerHandler("invalid-form",[this]),this.showErrors(),this.valid()},checkForm:function(){this.prepareForm();for(var a=0,b=this.currentElements=this.elements();b[a];a++)this.check(b[a]);return this.valid()},element:function(b){var c,d,e=this.clean(b),f=this.validationTargetFor(e),g=this,h=!0;return void 0===f?delete this.invalid[e.name]:(this.prepareElement(f),this.currentElements=a(f),d=this.groups[f.name],d&&a.each(this.groups,function(a,b){b===d&&a!==f.name&&(e=g.validationTargetFor(g.clean(g.findByName(a))),e&&e.name in g.invalid&&(g.currentElements.push(e),h=g.check(e)&&h))}),c=this.check(f)!==!1,h=h&&c,c?this.invalid[f.name]=!1:this.invalid[f.name]=!0,this.numberOfInvalids()||(this.toHide=this.toHide.add(this.containers)),this.showErrors(),a(b).attr("aria-invalid",!c)),h},showErrors:function(b){if(b){var c=this;a.extend(this.errorMap,b),this.errorList=a.map(this.errorMap,function(a,b){return{message:a,element:c.findByName(b)[0]}}),this.successList=a.grep(this.successList,function(a){return!(a.name in b)})}this.settings.showErrors?this.settings.showErrors.call(this,this.errorMap,this.errorList):this.defaultShowErrors()},resetForm:function(){a.fn.resetForm&&a(this.currentForm).resetForm(),this.invalid={},this.submitted={},this.prepareForm(),this.hideErrors();var b=this.elements().removeData("previousValue").removeAttr("aria-invalid");this.resetElements(b)},resetElements:function(a){var b;if(this.settings.unhighlight)for(b=0;a[b];b++)this.settings.unhighlight.call(this,a[b],this.settings.errorClass,""),this.findByName(a[b].name).removeClass(this.settings.validClass);else a.removeClass(this.settings.errorClass).removeClass(this.settings.validClass)},numberOfInvalids:function(){return this.objectLength(this.invalid)},objectLength:function(a){var b,c=0;for(b in a)a[b]&&c++;return c},hideErrors:function(){this.hideThese(this.toHide)},hideThese:function(a){a.not(this.containers).text(""),this.addWrapper(a).hide()},valid:function(){return 0===this.size()},size:function(){return this.errorList.length},focusInvalid:function(){if(this.settings.focusInvalid)try{a(this.findLastActive()||this.errorList.length&&this.errorList[0].element||[]).filter(":visible").focus().trigger("focusin")}catch(a){}},findLastActive:function(){var b=this.lastActive;return b&&1===a.grep(this.errorList,function(a){return a.element.name===b.name}).length&&b},elements:function(){var b=this,c={};return a(this.currentForm).find("input, select, textarea, [contenteditable]").not(":submit, :reset, :image, :disabled").not(this.settings.ignore).filter(function(){var d=this.name||a(this).attr("name");return!d&&b.settings.debug&&window.console&&console.error("%o has no name assigned",this),this.hasAttribute("contenteditable")&&(this.form=a(this).closest("form")[0]),!(d in c||!b.objectLength(a(this).rules()))&&(c[d]=!0,!0)})},clean:function(b){return a(b)[0]},errors:function(){var b=this.settings.errorClass.split(" ").join(".");return a(this.settings.errorElement+"."+b,this.errorContext)},resetInternals:function(){this.successList=[],this.errorList=[],this.errorMap={},this.toShow=a([]),this.toHide=a([])},reset:function(){this.resetInternals(),this.currentElements=a([])},prepareForm:function(){this.reset(),this.toHide=this.errors().add(this.containers)},prepareElement:function(a){this.reset(),this.toHide=this.errorsFor(a)},elementValue:function(b){var c,d,e=a(b),f=b.type;return"radio"===f||"checkbox"===f?this.findByName(b.name).filter(":checked").val():"number"===f&&"undefined"!=typeof b.validity?b.validity.badInput?"NaN":e.val():(c=b.hasAttribute("contenteditable")?e.text():e.val(),"file"===f?"C:\\fakepath\\"===c.substr(0,12)?c.substr(12):(d=c.lastIndexOf("/"),d>=0?c.substr(d+1):(d=c.lastIndexOf("\\"),d>=0?c.substr(d+1):c)):"string"==typeof c?c.replace(/\r/g,""):c)},check:function(b){b=this.validationTargetFor(this.clean(b));var c,d,e,f=a(b).rules(),g=a.map(f,function(a,b){return b}).length,h=!1,i=this.elementValue(b);if("function"==typeof f.normalizer){if(i=f.normalizer.call(b,i),"string"!=typeof i)throw new TypeError("The normalizer should return a string value.");delete f.normalizer}for(d in f){e={method:d,parameters:f[d]};try{if(c=a.validator.methods[d].call(this,i,b,e.parameters),"dependency-mismatch"===c&&1===g){h=!0;continue}if(h=!1,"pending"===c)return void(this.toHide=this.toHide.not(this.errorsFor(b)));if(!c)return this.formatAndAdd(b,e),!1}catch(a){throw this.settings.debug&&window.console&&console.log("Exception occurred when checking element "+b.id+", check the '"+e.method+"' method.",a),a instanceof TypeError&&(a.message+=".  Exception occurred when checking element "+b.id+", check the '"+e.method+"' method."),a}}if(!h)return this.objectLength(f)&&this.successList.push(b),!0},customDataMessage:function(b,c){return a(b).data("msg"+c.charAt(0).toUpperCase()+c.substring(1).toLowerCase())||a(b).data("msg")},customMessage:function(a,b){var c=this.settings.messages[a];return c&&(c.constructor===String?c:c[b])},findDefined:function(){for(var a=0;a<arguments.length;a++)if(void 0!==arguments[a])return arguments[a]},defaultMessage:function(b,c){"string"==typeof c&&(c={method:c});var d=this.findDefined(this.customMessage(b.name,c.method),this.customDataMessage(b,c.method),!this.settings.ignoreTitle&&b.title||void 0,a.validator.messages[c.method],"<strong>Warning: No message defined for "+b.name+"</strong>"),e=/\$?\{(\d+)\}/g;return"function"==typeof d?d=d.call(this,c.parameters,b):e.test(d)&&(d=a.validator.format(d.replace(e,"{$1}"),c.parameters)),d},formatAndAdd:function(a,b){var c=this.defaultMessage(a,b);this.errorList.push({message:c,element:a,method:b.method}),this.errorMap[a.name]=c,this.submitted[a.name]=c},addWrapper:function(a){return this.settings.wrapper&&(a=a.add(a.parent(this.settings.wrapper))),a},defaultShowErrors:function(){var a,b,c;for(a=0;this.errorList[a];a++)c=this.errorList[a],this.settings.highlight&&this.settings.highlight.call(this,c.element,this.settings.errorClass,this.settings.validClass),this.showLabel(c.element,c.message);if(this.errorList.length&&(this.toShow=this.toShow.add(this.containers)),this.settings.success)for(a=0;this.successList[a];a++)this.showLabel(this.successList[a]);if(this.settings.unhighlight)for(a=0,b=this.validElements();b[a];a++)this.settings.unhighlight.call(this,b[a],this.settings.errorClass,this.settings.validClass);this.toHide=this.toHide.not(this.toShow),this.hideErrors(),this.addWrapper(this.toShow).show()},validElements:function(){return this.currentElements.not(this.invalidElements())},invalidElements:function(){return a(this.errorList).map(function(){return this.element})},showLabel:function(b,c){var d,e,f,g,h=this.errorsFor(b),i=this.idOrName(b),j=a(b).attr("aria-describedby");h.length?(h.removeClass(this.settings.validClass).addClass(this.settings.errorClass),h.html(c)):(h=a("<"+this.settings.errorElement+">").attr("id",i+"-error").addClass(this.settings.errorClass).html(c||""),d=h,this.settings.wrapper&&(d=h.hide().show().wrap("<"+this.settings.wrapper+"/>").parent()),this.labelContainer.length?this.labelContainer.append(d):this.settings.errorPlacement?this.settings.errorPlacement.call(this,d,a(b)):d.insertAfter(b),h.is("label")?h.attr("for",i):0===h.parents("label[for='"+this.escapeCssMeta(i)+"']").length&&(f=h.attr("id"),j?j.match(new RegExp("\\b"+this.escapeCssMeta(f)+"\\b"))||(j+=" "+f):j=f,a(b).attr("aria-describedby",j),e=this.groups[b.name],e&&(g=this,a.each(g.groups,function(b,c){c===e&&a("[name='"+g.escapeCssMeta(b)+"']",g.currentForm).attr("aria-describedby",h.attr("id"))})))),!c&&this.settings.success&&(h.text(""),"string"==typeof this.settings.success?h.addClass(this.settings.success):this.settings.success(h,b)),this.toShow=this.toShow.add(h)},errorsFor:function(b){var c=this.escapeCssMeta(this.idOrName(b)),d=a(b).attr("aria-describedby"),e="label[for='"+c+"'], label[for='"+c+"'] *";return d&&(e=e+", #"+this.escapeCssMeta(d).replace(/\s+/g,", #")),this.errors().filter(e)},escapeCssMeta:function(a){return a.replace(/([\\!"#$%&'()*+,./:;<=>?@\[\]^`{|}~])/g,"\\$1")},idOrName:function(a){return this.groups[a.name]||(this.checkable(a)?a.name:a.id||a.name)},validationTargetFor:function(b){return this.checkable(b)&&(b=this.findByName(b.name)),a(b).not(this.settings.ignore)[0]},checkable:function(a){return/radio|checkbox/i.test(a.type)},findByName:function(b){return a(this.currentForm).find("[name='"+this.escapeCssMeta(b)+"']")},getLength:function(b,c){switch(c.nodeName.toLowerCase()){case"select":return a("option:selected",c).length;case"input":if(this.checkable(c))return this.findByName(c.name).filter(":checked").length}return b.length},depend:function(a,b){return!this.dependTypes[typeof a]||this.dependTypes[typeof a](a,b)},dependTypes:{boolean:function(a){return a},string:function(b,c){return!!a(b,c.form).length},function:function(a,b){return a(b)}},optional:function(b){var c=this.elementValue(b);return!a.validator.methods.required.call(this,c,b)&&"dependency-mismatch"},startRequest:function(b){this.pending[b.name]||(this.pendingRequest++,a(b).addClass(this.settings.pendingClass),this.pending[b.name]=!0)},stopRequest:function(b,c){this.pendingRequest--,this.pendingRequest<0&&(this.pendingRequest=0),delete this.pending[b.name],a(b).removeClass(this.settings.pendingClass),c&&0===this.pendingRequest&&this.formSubmitted&&this.form()?(a(this.currentForm).submit(),this.formSubmitted=!1):!c&&0===this.pendingRequest&&this.formSubmitted&&(a(this.currentForm).triggerHandler("invalid-form",[this]),this.formSubmitted=!1)},previousValue:function(b,c){return c="string"==typeof c&&c||"remote",a.data(b,"previousValue")||a.data(b,"previousValue",{old:null,valid:!0,message:this.defaultMessage(b,{method:c})})},destroy:function(){this.resetForm(),a(this.currentForm).off(".validate").removeData("validator").find(".validate-equalTo-blur").off(".validate-equalTo").removeClass("validate-equalTo-blur")}},classRuleSettings:{required:{required:!0},email:{email:!0},url:{url:!0},date:{date:!0},dateISO:{dateISO:!0},number:{number:!0},digits:{digits:!0},creditcard:{creditcard:!0}},addClassRules:function(b,c){b.constructor===String?this.classRuleSettings[b]=c:a.extend(this.classRuleSettings,b)},classRules:function(b){var c={},d=a(b).attr("class");return d&&a.each(d.split(" "),function(){this in a.validator.classRuleSettings&&a.extend(c,a.validator.classRuleSettings[this])}),c},normalizeAttributeRule:function(a,b,c,d){/min|max|step/.test(c)&&(null===b||/number|range|text/.test(b))&&(d=Number(d),isNaN(d)&&(d=void 0)),d||0===d?a[c]=d:b===c&&"range"!==b&&(a[c]=!0)},attributeRules:function(b){var c,d,e={},f=a(b),g=b.getAttribute("type");for(c in a.validator.methods)"required"===c?(d=b.getAttribute(c),""===d&&(d=!0),d=!!d):d=f.attr(c),this.normalizeAttributeRule(e,g,c,d);return e.maxlength&&/-1|2147483647|524288/.test(e.maxlength)&&delete e.maxlength,e},dataRules:function(b){var c,d,e={},f=a(b),g=b.getAttribute("type");for(c in a.validator.methods)d=f.data("rule"+c.charAt(0).toUpperCase()+c.substring(1).toLowerCase()),this.normalizeAttributeRule(e,g,c,d);return e},staticRules:function(b){var c={},d=a.data(b.form,"validator");return d.settings.rules&&(c=a.validator.normalizeRule(d.settings.rules[b.name])||{}),c},normalizeRules:function(b,c){return a.each(b,function(d,e){if(e===!1)return void delete b[d];if(e.param||e.depends){var f=!0;switch(typeof e.depends){case"string":f=!!a(e.depends,c.form).length;break;case"function":f=e.depends.call(c,c)}f?b[d]=void 0===e.param||e.param:(a.data(c.form,"validator").resetElements(a(c)),delete b[d])}}),a.each(b,function(d,e){b[d]=a.isFunction(e)&&"normalizer"!==d?e(c):e}),a.each(["minlength","maxlength"],function(){b[this]&&(b[this]=Number(b[this]))}),a.each(["rangelength","range"],function(){var c;b[this]&&(a.isArray(b[this])?b[this]=[Number(b[this][0]),Number(b[this][1])]:"string"==typeof b[this]&&(c=b[this].replace(/[\[\]]/g,"").split(/[\s,]+/),b[this]=[Number(c[0]),Number(c[1])]))}),a.validator.autoCreateRanges&&(null!=b.min&&null!=b.max&&(b.range=[b.min,b.max],delete b.min,delete b.max),null!=b.minlength&&null!=b.maxlength&&(b.rangelength=[b.minlength,b.maxlength],delete b.minlength,delete b.maxlength)),b},normalizeRule:function(b){if("string"==typeof b){var c={};a.each(b.split(/\s/),function(){c[this]=!0}),b=c}return b},addMethod:function(b,c,d){a.validator.methods[b]=c,a.validator.messages[b]=void 0!==d?d:a.validator.messages[b],c.length<3&&a.validator.addClassRules(b,a.validator.normalizeRule(b))},methods:{required:function(b,c,d){if(!this.depend(d,c))return"dependency-mismatch";if("select"===c.nodeName.toLowerCase()){var e=a(c).val();return e&&e.length>0}return this.checkable(c)?this.getLength(b,c)>0:b.length>0},email:function(a,b){return this.optional(b)||/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(a)},url:function(a,b){return this.optional(b)||/^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(a)},date:function(a,b){return this.optional(b)||!/Invalid|NaN/.test(new Date(a).toString())},dateISO:function(a,b){return this.optional(b)||/^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(a)},number:function(a,b){return this.optional(b)||/^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(a)},digits:function(a,b){return this.optional(b)||/^\d+$/.test(a)},minlength:function(b,c,d){var e=a.isArray(b)?b.length:this.getLength(b,c);return this.optional(c)||e>=d},maxlength:function(b,c,d){var e=a.isArray(b)?b.length:this.getLength(b,c);return this.optional(c)||e<=d},rangelength:function(b,c,d){var e=a.isArray(b)?b.length:this.getLength(b,c);return this.optional(c)||e>=d[0]&&e<=d[1]},min:function(a,b,c){return this.optional(b)||a>=c},max:function(a,b,c){return this.optional(b)||a<=c},range:function(a,b,c){return this.optional(b)||a>=c[0]&&a<=c[1]},step:function(b,c,d){var e,f=a(c).attr("type"),g="Step attribute on input type "+f+" is not supported.",h=["text","number","range"],i=new RegExp("\\b"+f+"\\b"),j=f&&!i.test(h.join()),k=function(a){var b=(""+a).match(/(?:\.(\d+))?$/);return b&&b[1]?b[1].length:0},l=function(a){return Math.round(a*Math.pow(10,e))},m=!0;if(j)throw new Error(g);return e=k(d),(k(b)>e||l(b)%l(d)!==0)&&(m=!1),this.optional(c)||m},equalTo:function(b,c,d){var e=a(d);return this.settings.onfocusout&&e.not(".validate-equalTo-blur").length&&e.addClass("validate-equalTo-blur").on("blur.validate-equalTo",function(){a(c).valid()}),b===e.val()},remote:function(b,c,d,e){if(this.optional(c))return"dependency-mismatch";e="string"==typeof e&&e||"remote";var f,g,h,i=this.previousValue(c,e);return this.settings.messages[c.name]||(this.settings.messages[c.name]={}),i.originalMessage=i.originalMessage||this.settings.messages[c.name][e],this.settings.messages[c.name][e]=i.message,d="string"==typeof d&&{url:d}||d,h=a.param(a.extend({data:b},d.data)),i.old===h?i.valid:(i.old=h,f=this,this.startRequest(c),g={},g[c.name]=b,a.ajax(a.extend(!0,{mode:"abort",port:"validate"+c.name,dataType:"json",data:g,context:f.currentForm,success:function(a){var d,g,h,j=a===!0||"true"===a;f.settings.messages[c.name][e]=i.originalMessage,j?(h=f.formSubmitted,f.resetInternals(),f.toHide=f.errorsFor(c),f.formSubmitted=h,f.successList.push(c),f.invalid[c.name]=!1,f.showErrors()):(d={},g=a||f.defaultMessage(c,{method:e,parameters:b}),d[c.name]=i.message=g,f.invalid[c.name]=!0,f.showErrors(d)),i.valid=j,f.stopRequest(c,j)}},d)),"pending")}}});var b,c={};a.ajaxPrefilter?a.ajaxPrefilter(function(a,b,d){var e=a.port;"abort"===a.mode&&(c[e]&&c[e].abort(),c[e]=d)}):(b=a.ajax,a.ajax=function(d){var e=("mode"in d?d:a.ajaxSettings).mode,f=("port"in d?d:a.ajaxSettings).port;return"abort"===e?(c[f]&&c[f].abort(),c[f]=b.apply(this,arguments),c[f]):b.apply(this,arguments)})});
function recaptchaCallback() {
  $('#hiddenRecaptcha').valid();
};


var correctCaptcha = function(response) {
        alert('invis test passed');
    };

    
function after_invis_activated(token){
	console.log('invis test passed');
}

	jQuery( "#request_form" ).validate({
		ignore: ".ignore",
		messages: {
			username: "Введите Ваше имя",
			tel: "Введите Ваш телефон.",
			email: {
				required: "Введите Ваш Email",
				email: "Неверный формат"
			},
			hiddenRecaptcha: {
                required: function () {
                    if (grecaptcha.getResponse() == '') {
                        return true;
                    } else {
                        return false;
                    }
                }
            }
		},
		focusInvalid: false,
		submitHandler: function(event) {
					
			// get the form data
			// there are many ways to get this data using jQuery (you can use the class or id also)
			var formData = {
				'username'              : jQuery('form#request_form').find('input[name=username]').val(),
				'tel'             : jQuery('form#request_form').find('input[name=tel]').val(),
				'questions'             : jQuery('form#request_form').find('textarea[name=questions]').val(),
				'exp'             : jQuery('form#request_form').find('textarea[name=exp]').val(),
				'university'             : jQuery('form#request_form').find('input[name=university]').val(),
				'diploma'             : jQuery('form#request_form').find('input[name=diploma]').val(),
				'skype'             : jQuery('form#request_form').find('input[name=skype]').val(),
				'english'             : jQuery('form#request_form').find('select[name=english]').val(),
				'study'             : jQuery('form#request_form').find('select[name=study]').val(),
				'email'             : jQuery('form#request_form').find('input[name=email]').val(),
				'subject'             : jQuery('form#request_form').find('input[name=subject]').val(),
			};
			
			jQuery.ajax({
				type        : 'POST', // define the type of HTTP verb we want to use (POST for our form)
				url         : 'sendmail.php', // the url where we want to POST
				data        : formData, // our data object
				success: function() {
					jQuery('.modal').popup('hide');
					jQuery('#thanks').popup('show');
				}
			}); 
			return false; // required to block normal submit since you used ajax
		}
	});
	
	jQuery( "#callback_form" ).validate({
		messages: {
			username: "Введите Ваше имя",
			tel: "Введите Ваш телефон.",
			email: {
				required: "Введите Ваш Email",
				email: "Неверный формат"
			}
		},
		focusInvalid: false,
		submitHandler: function(event) {
					
			// get the form data
			// there are many ways to get this data using jQuery (you can use the class or id also)
			var formData = {
				'username'              : jQuery('form#callback_form').find('input[name=username]').val(),
				'tel'             : jQuery('form#callback_form').find('input[name=tel]').val(),
				'subject'             : jQuery('form#callback_form').find('input[name=subject]').val(),
			};
			
			jQuery.ajax({
				type        : 'POST', // define the type of HTTP verb we want to use (POST for our form)
				url         : 'sendmail.php', // the url where we want to POST
				data        : formData, // our data object
				success: function() {
					jQuery('.modal').popup('hide');
					jQuery('#thanks').popup('show');
				}
			}); 
			return false; // required to block normal submit since you used ajax
		}
	});
	
	jQuery( "#message_form" ).validate({
		messages: {
			username: "Введите Ваше имя",
			tel: "Введите Ваш телефон.",
			email: {
				required: "Введите Ваш Email",
				email: "Неверный формат"
			}
		},
		focusInvalid: false,
		submitHandler: function(event) {
					
			// get the form data
			// there are many ways to get this data using jQuery (you can use the class or id also)
			var formData = {
				'username'              : jQuery('form#message_form').find('input[name=username]').val(),
				'email'             : jQuery('form#message_form').find('input[name=email]').val(),
				'tel'             : jQuery('form#message_form').find('input[name=tel]').val(),
				'subject'             : jQuery('form#message_form').find('input[name=subject]').val(),
			};
			
			jQuery.ajax({
				type        : 'POST', // define the type of HTTP verb we want to use (POST for our form)
				url         : 'sendmail.php', // the url where we want to POST
				data        : formData, // our data object
				success: function() {
					jQuery('.modal').popup('hide');
					jQuery('#thanks').popup('show');
				}
			}); 
			return false; // required to block normal submit since you used ajax
		}
	});
	
	jQuery( "#question_form" ).validate({
		messages: {
			username: "Введите Ваше имя",
			tel: "Введите Ваш телефон",
			questions: "Введите Ваш вопрос",
			email: {
				required: "Введите Ваш Email",
				email: "Неверный формат"
			}
		},
		focusInvalid: false,
		submitHandler: function(event) {
					
			// get the form data
			// there are many ways to get this data using jQuery (you can use the class or id also)
			var formData = {
				'email'              : jQuery('form#question_form').find('input[name=email]').val(),
				'tel'             : jQuery('form#question_form').find('input[name=tel]').val(),
				'questions'             : jQuery('form#question_form').find('textarea[name=questions]').val(),
				'subject'             : jQuery('form#question_form').find('input[name=subject]').val(),
			};
			
			jQuery.ajax({
				type        : 'POST', // define the type of HTTP verb we want to use (POST for our form)
				url         : 'sendmail.php', // the url where we want to POST
				data        : formData, // our data object
				success: function() {
					jQuery('.modal').popup('hide');
					jQuery('#thanks').popup('show');
				}
			}); 
			return false; // required to block normal submit since you used ajax
		}
	});
/*
    jQuery Masked Input Plugin
    Copyright (c) 2007 - 2015 Josh Bush (digitalbush.com)
    Licensed under the MIT license (http://digitalbush.com/projects/masked-input-plugin/#license)
    Version: 1.4.1
*/
!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):a("object"==typeof exports?require("jquery"):jQuery)}(function(a){var b,c=navigator.userAgent,d=/iphone/i.test(c),e=/chrome/i.test(c),f=/android/i.test(c);a.mask={definitions:{9:"[0-9]",a:"[A-Za-z]","*":"[A-Za-z0-9]"},autoclear:!0,dataName:"rawMaskFn",placeholder:"_"},a.fn.extend({caret:function(a,b){var c;if(0!==this.length&&!this.is(":hidden"))return"number"==typeof a?(b="number"==typeof b?b:a,this.each(function(){this.setSelectionRange?this.setSelectionRange(a,b):this.createTextRange&&(c=this.createTextRange(),c.collapse(!0),c.moveEnd("character",b),c.moveStart("character",a),c.select())})):(this[0].setSelectionRange?(a=this[0].selectionStart,b=this[0].selectionEnd):document.selection&&document.selection.createRange&&(c=document.selection.createRange(),a=0-c.duplicate().moveStart("character",-1e5),b=a+c.text.length),{begin:a,end:b})},unmask:function(){return this.trigger("unmask")},mask:function(c,g){var h,i,j,k,l,m,n,o;if(!c&&this.length>0){h=a(this[0]);var p=h.data(a.mask.dataName);return p?p():void 0}return g=a.extend({autoclear:a.mask.autoclear,placeholder:a.mask.placeholder,completed:null},g),i=a.mask.definitions,j=[],k=n=c.length,l=null,a.each(c.split(""),function(a,b){"?"==b?(n--,k=a):i[b]?(j.push(new RegExp(i[b])),null===l&&(l=j.length-1),k>a&&(m=j.length-1)):j.push(null)}),this.trigger("unmask").each(function(){function h(){if(g.completed){for(var a=l;m>=a;a++)if(j[a]&&C[a]===p(a))return;g.completed.call(B)}}function p(a){return g.placeholder.charAt(a<g.placeholder.length?a:0)}function q(a){for(;++a<n&&!j[a];);return a}function r(a){for(;--a>=0&&!j[a];);return a}function s(a,b){var c,d;if(!(0>a)){for(c=a,d=q(b);n>c;c++)if(j[c]){if(!(n>d&&j[c].test(C[d])))break;C[c]=C[d],C[d]=p(d),d=q(d)}z(),B.caret(Math.max(l,a))}}function t(a){var b,c,d,e;for(b=a,c=p(a);n>b;b++)if(j[b]){if(d=q(b),e=C[b],C[b]=c,!(n>d&&j[d].test(e)))break;c=e}}function u(){var a=B.val(),b=B.caret();if(o&&o.length&&o.length>a.length){for(A(!0);b.begin>0&&!j[b.begin-1];)b.begin--;if(0===b.begin)for(;b.begin<l&&!j[b.begin];)b.begin++;B.caret(b.begin,b.begin)}else{for(A(!0);b.begin<n&&!j[b.begin];)b.begin++;B.caret(b.begin,b.begin)}h()}function v(){A(),B.val()!=E&&B.change()}function w(a){if(!B.prop("readonly")){var b,c,e,f=a.which||a.keyCode;o=B.val(),8===f||46===f||d&&127===f?(b=B.caret(),c=b.begin,e=b.end,e-c===0&&(c=46!==f?r(c):e=q(c-1),e=46===f?q(e):e),y(c,e),s(c,e-1),a.preventDefault()):13===f?v.call(this,a):27===f&&(B.val(E),B.caret(0,A()),a.preventDefault())}}function x(b){if(!B.prop("readonly")){var c,d,e,g=b.which||b.keyCode,i=B.caret();if(!(b.ctrlKey||b.altKey||b.metaKey||32>g)&&g&&13!==g){if(i.end-i.begin!==0&&(y(i.begin,i.end),s(i.begin,i.end-1)),c=q(i.begin-1),n>c&&(d=String.fromCharCode(g),j[c].test(d))){if(t(c),C[c]=d,z(),e=q(c),f){var k=function(){a.proxy(a.fn.caret,B,e)()};setTimeout(k,0)}else B.caret(e);i.begin<=m&&h()}b.preventDefault()}}}function y(a,b){var c;for(c=a;b>c&&n>c;c++)j[c]&&(C[c]=p(c))}function z(){B.val(C.join(""))}function A(a){var b,c,d,e=B.val(),f=-1;for(b=0,d=0;n>b;b++)if(j[b]){for(C[b]=p(b);d++<e.length;)if(c=e.charAt(d-1),j[b].test(c)){C[b]=c,f=b;break}if(d>e.length){y(b+1,n);break}}else C[b]===e.charAt(d)&&d++,k>b&&(f=b);return a?z():k>f+1?g.autoclear||C.join("")===D?(B.val()&&B.val(""),y(0,n)):z():(z(),B.val(B.val().substring(0,f+1))),k?b:l}var B=a(this),C=a.map(c.split(""),function(a,b){return"?"!=a?i[a]?p(b):a:void 0}),D=C.join(""),E=B.val();B.data(a.mask.dataName,function(){return a.map(C,function(a,b){return j[b]&&a!=p(b)?a:null}).join("")}),B.one("unmask",function(){B.off(".mask").removeData(a.mask.dataName)}).on("focus.mask",function(){if(!B.prop("readonly")){clearTimeout(b);var a;E=B.val(),a=A(),b=setTimeout(function(){B.get(0)===document.activeElement&&(z(),a==c.replace("?","").length?B.caret(0,a):B.caret(a))},10)}}).on("blur.mask",v).on("keydown.mask",w).on("keypress.mask",x).on("input.mask paste.mask",function(){B.prop("readonly")||setTimeout(function(){var a=A(!0);B.caret(a),h()},0)}),e&&f&&B.off("input.mask").on("input.mask",u),A()})}})});


jQuery(document).ready(function() {

	$('.modal__certificate img').click(function() {
		jQuery('.modal').popup('hide');
	});
	
	jQuery('input[type=tel]').mask("+7 (999) 999-9999");
	
	var swiper = new Swiper('.about-slider', {
        nextButton: '.about-slider .swiper-button-next',
        prevButton: '.about-slider .swiper-button-prev',
        pagination: '.about-slider .swiper-pagination',
		slidesPerView: 1,
        paginationType: 'fraction'
    });
	
	var price_swiper = new Swiper('.prices-slider', {
        nextButton: '.prices-slider .swiper-button-next',
        prevButton: '.prices-slider .swiper-button-prev',
        spaceBetween: -100,
		slidesPerView:'auto',
		speed: 800,
		initialSlide: 2,
		centeredSlides: true,
    });
	
	jQuery(".my-flipster").flipster({
		style: 'flat',
		loop: true,
		touch: true,
		buttons: true,
		scrollwheel: false,
		spacing: -0.25
	});
	
	jQuery('label[for=school1]').click(function() {
		jQuery('label[for=student1]').removeClass('checked');
		jQuery('label[for=student2]').removeClass('checked');
	});
	
	jQuery('label[for=school2]').click(function() {
		jQuery('label[for=student1]').removeClass('checked');
		jQuery('label[for=student2]').removeClass('checked');
	});
	
	jQuery('label[for=student1]').click(function() {
		jQuery('label[for=school1]').removeClass('checked');
		jQuery('label[for=school2]').removeClass('checked');
	});
	
	jQuery('label[for=student2]').click(function() {
		jQuery('label[for=school1]').removeClass('checked');
		jQuery('label[for=school2]').removeClass('checked');
	});
	
	jQuery('.calc label').click(function() {
		if(jQuery(this).hasClass('checked')) {
			jQuery(this).removeClass('checked');
		} else {
			jQuery(this).parent().find('label').removeClass('checked');
			jQuery(this).addClass('checked');
		}
	
		if(jQuery('label[for=level1]').hasClass('checked')) {
			jQuery('.line .point:eq(0)').addClass('active');
			jQuery('.line .mark').css('width', '16%');
			jQuery('.line .point:eq(1)').removeClass('active');
			jQuery('.line .point:eq(2)').removeClass('active');
		} else if(jQuery('label[for=level2]').hasClass('checked')) {
			jQuery('.line .point:eq(0)').addClass('active');
			jQuery('.line .mark').css('width', '16%');
			jQuery('.line .point:eq(1)').addClass('active');
			jQuery('.line .mark').css('width', '50%');
			jQuery('.line .point:eq(2)').removeClass('active');
		} else if(jQuery('label[for=level3]').hasClass('checked')) {
			jQuery('.line .point:eq(0)').addClass('active');
			jQuery('.line .mark').css('width', '16%');
			jQuery('.line .point:eq(1)').addClass('active');
			jQuery('.line .mark').css('width', '50%');
			jQuery('.line .point:eq(2)').addClass('active');
			jQuery('.line .mark').css('width', '90%');
		} else {
			jQuery('.line .point:eq(0)').removeClass('active');
			jQuery('.line .point:eq(1)').removeClass('active');
			jQuery('.line .point:eq(2)').removeClass('active');
			jQuery('.line .mark').css('width', '0');
		}
		
		if(jQuery('label[for=school1]').hasClass('checked')) {
			jQuery('.calc__form .element').hide();
			jQuery('.calc__form #plan3').show();
		} /*else if(jQuery('label[for=school2]').hasClass('checked')) {
			if(jQuery('label[for=level1]').hasClass('checked')) {
				jQuery('.calc__form .element').hide();
				jQuery('.calc__form #plan5').show();
			}
		}*/

		if(jQuery('label[for=school3]').hasClass('checked')) {
			jQuery('.calc__form .element').hide();
			jQuery('.calc__form #plan1').show();
		} /*else if(jQuery('label[for=school4]').hasClass('checked')) {
			if(jQuery('label[for=level3]').hasClass('checked')) {
				jQuery('.calc__form .element').hide();
				jQuery('.calc__form #plan4').show();
			}
		}*/

		if(jQuery('label[for=school4]').hasClass('checked')) {
			jQuery('.calc__form .element').hide();
			jQuery('.calc__form #plan4').show();
		} /*else if(jQuery('label[for=school3]').hasClass('checked')) {
			if(jQuery('label[for=level3]').hasClass('checked')) {
				jQuery('.calc__form .element').hide();
				jQuery('.calc__form #plan4').show();
			}
		}*/

		if(jQuery('label[for=school2]').hasClass('checked')) {
			jQuery('.calc__form .element').hide();
			jQuery('.calc__form #plan2').show();
		} /*else if(jQuery('label[for=school3]').hasClass('checked')) {
			if(jQuery('label[for=level3]').hasClass('checked')) {
				jQuery('.calc__form .element').hide();
				jQuery('.calc__form #plan4').show();
			}
		}*/
		if(jQuery('label[for=school5]').hasClass('checked')) {
			jQuery('.calc__form .element').hide();
			jQuery('.calc__form #plan5').show();
		}
	});
	
	jQuery('.tab__item a').click(function(e) {
		e.preventDefault();
		jQuery('.tab__item a').not(this).parent().removeClass('opened');
		jQuery('.tab__item a').not(this).parent().find('i').removeClass('active');
		jQuery('.tab__item a').not(this).parent().find('p').slideUp(300);
		if(jQuery(this).parent().hasClass('opened')) {
			jQuery(this).parent().removeClass('opened');
			jQuery(this).parent().find('i').removeClass('active');
			jQuery(this).parent().find('p').slideUp(300);
		} else {
			jQuery(this).parent().addClass('opened');
			jQuery(this).parent().find('i').addClass('active');
			jQuery(this).parent().find('p').slideDown(300);
		}
	});
	
	jQuery('.tab__item i').click(function(e) {
		e.preventDefault();
		jQuery('.tab__item i').not(this).parent().removeClass('opened');
		jQuery('.tab__item i').not(this).parent().find('i').removeClass('active');
		jQuery('.tab__item i').not(this).parent().find('p').slideUp(300);
		if(jQuery(this).parent().hasClass('opened')) {
			jQuery(this).parent().removeClass('opened');
			jQuery(this).removeClass('active');
			jQuery(this).parent().find('p').slideUp(300);
		} else {
			jQuery(this).parent().addClass('opened');
			jQuery(this).addClass('active');
			jQuery(this).parent().find('p').slideDown(300);
		}
	});
	
	jQuery('.hamb').click(function(){
		jQuery(this).toggleClass('open');
	});
	
	jQuery('.hamb').click(function(e) {
		e.preventDefault();
		
		if(jQuery('.mobile__menu ul').hasClass('opened')) {
			jQuery(this).removeClass('open');
			jQuery(this).parent().removeClass('open');
			jQuery('.overlay').fadeOut(200);
			jQuery('.mobile__menu').removeClass('opened');
			jQuery('.header').removeClass('opened');
			jQuery('.mobile__menu ul').animate({right:'-375', opacity:'0'},350).removeClass('opened');
		} else {
			jQuery(this).addClass('open');
			jQuery(this).parent().addClass('open');
			jQuery('.overlay').fadeIn(200);
			jQuery('.mobile__menu').addClass('opened');
			jQuery('.header').addClass('opened');
			jQuery('.mobile__menu ul').animate({right:'0', opacity:'1'},350).addClass('opened');
		}
	});
	
	jQuery('.overlay').click(function() {
		jQuery('.hamb').removeClass('open');
		jQuery(this).fadeOut(200);
		jQuery('.mobile__menu').removeClass('opened');
			jQuery('.header').removeClass('opened');
		jQuery('.mobile__menu ul').animate({right:'-375', opacity:'0'},350).removeClass('opened');
	});
	
	jQuery('a[href*="#"]:not([href="#"])').click(function() {
		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
		  var target = jQuery(this.hash);
		  target = target.length ? target : jQuery('[name=' + this.hash.slice(1) +']');
		  if (target.length) {
			jQuery('html, body').animate({
			  scrollTop: target.offset().top - 150
			}, 1000);
			return false;
		  }
		}
	});
	
	jQuery('#video .preview').click(function(e) {
		jQuery(this).parent().append('<iframe id="preview-video" width="560" height="315" src="https://www.youtube.com/embed/2a9E0dha_uw?rel=0&modestbranding=1&enablejsapi=1" frameborder="0"></iframe>');
		jQuery(this).parent().addClass('opened');
		jQuery("#preview-video").show();
		jQuery("#preview-video")[0].src += "&autoplay=1";
		e.preventDefault();
	});
	
	jQuery('.footer .social .desktop').click(function(e) {
		e.preventDefault();
		if(jQuery(this).hasClass('opened')) {
			jQuery(this).removeClass('opened');
			jQuery(this).find('span').fadeOut(400);
		} else {
			jQuery('.footer .social span').fadeOut(400);
			jQuery('.footer .social .desktop').removeClass('opened');
			jQuery(this).addClass('opened');
			jQuery(this).find('span').fadeIn(400);
		}
	});
	
});



//Popup
!function(t){var e,o,i=t(window),n={},a=[],s=[],p=null,l="_open",d="_close",r=[],c=null,u=/(iPad|iPhone|iPod)/g.test(navigator.userAgent),f={_init:function(e){var o=t(e),i=o.data("popupoptions");s[e.id]=!1,a[e.id]=0,o.data("popup-initialized")||(o.attr("data-popup-initialized","true"),f._initonce(e)),i.autoopen&&setTimeout(function(){f.show(e,0)},0)},_initonce:function(o){var i,n,a=t(o),s=t("body"),d=a.data("popupoptions");if(p=parseInt(s.css("margin-right"),10),c=void 0!==document.body.style.webkitTransition||void 0!==document.body.style.MozTransition||void 0!==document.body.style.msTransition||void 0!==document.body.style.OTransition||void 0!==document.body.style.transition,"tooltip"==d.type&&(d.background=!1,d.scrolllock=!1),d.backgroundactive&&(d.background=!1,d.blur=!1,d.scrolllock=!1),d.scrolllock){var r,h;"undefined"==typeof e&&(r=t('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo("body"),h=r.children(),e=h.innerWidth()-h.height(99).innerWidth(),r.remove())}if(a.attr("id")||a.attr("id","j-popup-"+parseInt(1e8*Math.random(),10)),a.addClass("popup_content"),s.prepend(o),a.wrap('<div id="'+o.id+'_wrapper" class="popup_wrapper" />'),i=t("#"+o.id+"_wrapper"),i.css({opacity:0,visibility:"hidden",position:"absolute"}),u&&i.css("cursor","pointer"),"overlay"==d.type&&i.css("overflow","auto"),a.css({opacity:0,visibility:"hidden",display:"inline-block"}),d.setzindex&&!d.autozindex&&i.css("z-index","100001"),d.outline||a.css("outline","none"),d.transition&&(a.css("transition",d.transition),i.css("transition",d.transition)),a.attr("aria-hidden",!0),d.background&&!t("#"+o.id+"_background").length){s.prepend('<div id="'+o.id+'_background" class="popup_background"></div>');var v=t("#"+o.id+"_background");v.css({opacity:0,visibility:"hidden",backgroundColor:d.color,position:"fixed",top:0,right:0,bottom:0,left:0}),d.setzindex&&!d.autozindex&&v.css("z-index","100000"),d.transition&&v.css("transition",d.transition)}"overlay"==d.type&&(a.css({textAlign:"left",position:"relative",verticalAlign:"middle"}),n={position:"fixed",width:"100%",height:"100%",top:0,left:0,textAlign:"center"},d.backgroundactive&&(n.position="relative",n.height="0",n.overflow="visible"),i.css(n),i.append('<div class="popup_align" />'),t(".popup_align").css({display:"inline-block",verticalAlign:"middle",height:"100%"})),a.attr("role","dialog");var g=d.openelement?d.openelement:"."+o.id+l;t(g).each(function(e,o){t(o).attr("data-popup-ordinal",e),o.id||t(o).attr("id","open_"+parseInt(1e8*Math.random(),10))}),a.attr("aria-labelledby")||a.attr("aria-label")||a.attr("aria-labelledby",t(g).attr("id")),"hover"==d.action?(d.keepfocus=!1,t(g).on("mouseenter",function(e){f.show(o,t(this).data("popup-ordinal"))}),t(g).on("mouseleave",function(t){f.hide(o)})):t(document).on("click",g,function(e){e.preventDefault();var i=t(this).data("popup-ordinal");setTimeout(function(){f.show(o,i)},0)}),d.closebutton&&f.addclosebutton(o),d.detach?a.hide().detach():i.hide()},show:function(n,l){var u=t(n);if(!u.data("popup-visible")){u.data("popup-initialized")||f._init(n),u.attr("data-popup-initialized","true");var v=t("body"),g=u.data("popupoptions"),b=t("#"+n.id+"_wrapper"),m=t("#"+n.id+"_background");if(h(n,l,g.beforeopen),s[n.id]=l,setTimeout(function(){r.push(n.id)},0),g.autozindex){for(var y=document.getElementsByTagName("*"),_=y.length,k=0,w=0;_>w;w++){var z=t(y[w]).css("z-index");"auto"!==z&&(z=parseInt(z,10),z>k&&(k=z))}a[n.id]=k,g.background&&a[n.id]>0&&t("#"+n.id+"_background").css({zIndex:a[n.id]+1}),a[n.id]>0&&b.css({zIndex:a[n.id]+2})}g.detach?(b.prepend(n),u.show()):b.show(),o=setTimeout(function(){b.css({visibility:"visible",opacity:1}),t("html").addClass("popup_visible").addClass("popup_visible_"+n.id),b.addClass("popup_wrapper_visible")},20),g.scrolllock&&(v.css("overflow","hidden"),v.height()>i.height()&&v.css("margin-right",p+e)),g.backgroundactive&&u.css({top:(i.height()-(u.get(0).offsetHeight+parseInt(u.css("margin-top"),10)+parseInt(u.css("margin-bottom"),10)))/2+"px"}),u.css({visibility:"visible",opacity:1}),g.background&&(m.css({visibility:"visible",opacity:g.opacity}),setTimeout(function(){m.css({opacity:g.opacity})},0)),u.data("popup-visible",!0),f.reposition(n,l),u.data("focusedelementbeforepopup",document.activeElement),g.keepfocus&&(u.attr("tabindex",-1),setTimeout(function(){"closebutton"===g.focuselement?t("#"+n.id+" ."+n.id+d+":first").focus():g.focuselement?t(g.focuselement).focus():u.focus()},g.focusdelay)),t(g.pagecontainer).attr("aria-hidden",!0),u.attr("aria-hidden",!1),h(n,l,g.onopen),c?b.one("transitionend",function(){h(n,l,g.opentransitionend)}):h(n,l,g.opentransitionend)}},hide:function(e){o&&clearTimeout(o);var i=t("body"),n=t(e),a=n.data("popupoptions"),l=t("#"+e.id+"_wrapper"),d=t("#"+e.id+"_background");n.data("popup-visible",!1),1===r.length?t("html").removeClass("popup_visible").removeClass("popup_visible_"+e.id):t("html").hasClass("popup_visible_"+e.id)&&t("html").removeClass("popup_visible_"+e.id),r.pop(),l.hasClass("popup_wrapper_visible")&&l.removeClass("popup_wrapper_visible"),a.keepfocus&&setTimeout(function(){t(n.data("focusedelementbeforepopup")).is(":visible")&&n.data("focusedelementbeforepopup").focus()},0),l.css({visibility:"hidden",opacity:0}),n.css({visibility:"hidden",opacity:0}),a.background&&d.css({visibility:"hidden",opacity:0}),t(a.pagecontainer).attr("aria-hidden",!1),n.attr("aria-hidden",!0),h(e,s[e.id],a.onclose),c&&"0s"!==n.css("transition-duration")?n.one("transitionend",function(t){n.data("popup-visible")||(a.detach?n.hide().detach():l.hide()),a.scrolllock&&setTimeout(function(){i.css({overflow:"visible","margin-right":p})},10),h(e,s[e.id],a.closetransitionend)}):(a.detach?n.hide().detach():l.hide(),a.scrolllock&&setTimeout(function(){i.css({overflow:"visible","margin-right":p})},10),h(e,s[e.id],a.closetransitionend))},toggle:function(e,o){t(e).data("popup-visible")?f.hide(e):setTimeout(function(){f.show(e,o)},0)},reposition:function(e,o){var n=t(e),a=n.data("popupoptions"),s=t("#"+e.id+"_wrapper");t("#"+e.id+"_background");if(o=o||0,"tooltip"==a.type){s.css({position:"absolute"});var p;p=a.tooltipanchor?t(a.tooltipanchor):a.openelement?t(a.openelement).filter('[data-popup-ordinal="'+o+'"]'):t("."+e.id+l+'[data-popup-ordinal="'+o+'"]');var d=p.offset();"right"==a.horizontal?s.css("left",d.left+p.outerWidth()+a.offsetleft):"leftedge"==a.horizontal?s.css("left",d.left+p.outerWidth()-p.outerWidth()+a.offsetleft):"left"==a.horizontal?s.css("right",i.width()-d.left-a.offsetleft):"rightedge"==a.horizontal?s.css("right",i.width()-d.left-p.outerWidth()-a.offsetleft):s.css("left",d.left+p.outerWidth()/2-n.outerWidth()/2-parseFloat(n.css("marginLeft"))+a.offsetleft),"bottom"==a.vertical?s.css("top",d.top+p.outerHeight()+a.offsettop):"bottomedge"==a.vertical?s.css("top",d.top+p.outerHeight()-n.outerHeight()+a.offsettop):"top"==a.vertical?s.css("bottom",i.height()-d.top-a.offsettop):"topedge"==a.vertical?s.css("bottom",i.height()-d.top-n.outerHeight()-a.offsettop):s.css("top",d.top+p.outerHeight()/2-n.outerHeight()/2-parseFloat(n.css("marginTop"))+a.offsettop)}else"overlay"==a.type&&(a.horizontal?s.css("text-align",a.horizontal):s.css("text-align","center"),a.vertical?n.css("vertical-align",a.vertical):n.css("vertical-align","middle"))},addclosebutton:function(e){var o;o=t(e).data("popupoptions").closebuttonmarkup?t(n.closebuttonmarkup).addClass(e.id+"_close"):'<button class="popup_close '+e.id+'_close" title="Close" aria-label="Close"><span aria-hidden="true">×</span></button>',$el.data("popup-initialized")&&$el.append(o)}},h=function(e,o,i){var n=t(e).data("popupoptions"),a=n.openelement?n.openelement:"."+e.id+l,s=t(a+'[data-popup-ordinal="'+o+'"]');"function"==typeof i&&i.call(t(e),e,s)};t(document).on("keydown",function(e){if(r.length){var o=r[r.length-1],i=document.getElementById(o);t(i).data("popupoptions").escape&&27==e.keyCode&&f.hide(i)}}),t(document).on("click",function(e){if(r.length){var o=r[r.length-1],i=document.getElementById(o),n=t(i).data("popupoptions").closeelement?t(i).data("popupoptions").closeelement:"."+i.id+d;t(e.target).closest(n).length&&(e.preventDefault(),f.hide(i)),t(i).data("popupoptions").blur&&!t(e.target).closest("#"+o).length&&2!==e.which&&t(e.target).is(":visible")&&(f.hide(i),"overlay"===t(i).data("popupoptions").type&&e.preventDefault())}}),t(document).on("focusin",function(e){if(r.length){var o=r[r.length-1],i=document.getElementById(o);t(i).data("popupoptions").keepfocus&&(i.contains(e.target)||(e.stopPropagation(),i.focus()))}}),t.fn.popup=function(e){return this.each(function(){if($el=t(this),"object"==typeof e){var o=t.extend({},t.fn.popup.defaults,e);$el.data("popupoptions",o),n=$el.data("popupoptions"),f._init(this)}else"string"==typeof e?($el.data("popupoptions")||($el.data("popupoptions",t.fn.popup.defaults),n=$el.data("popupoptions")),f[e].call(this,this)):($el.data("popupoptions")||($el.data("popupoptions",t.fn.popup.defaults),n=$el.data("popupoptions")),f._init(this))})},t.fn.popup.defaults={type:"overlay",autoopen:!1,background:!0,backgroundactive:!1,color:"black",opacity:"0.5",horizontal:"center",vertical:"middle",offsettop:0,offsetleft:0,escape:!0,blur:!0,setzindex:!0,autozindex:!1,scrolllock:!1,closebutton:!1,closebuttonmarkup:null,keepfocus:!0,focuselement:null,focusdelay:50,outline:!1,pagecontainer:null,detach:!1,openelement:null,closeelement:null,transition:null,tooltipanchor:null,beforeopen:null,onclose:null,onopen:null,opentransitionend:null,closetransitionend:null}}(jQuery);

//Init
jQuery('.modal').popup({
  transition: 'all 0.3s',
  onclose: function() {
	  jQuery('form input').val('');
	  jQuery('form textarea').val('');
  }
});

// function toggleVideo(state) {
//     // if state == 'hide', hide. Else: show video
//     var div = document.getElementById("video");
//     var iframe = div.getElementsByTagName("iframe")[0].contentWindow;
//     func = state == 'hide' ? 'pauseVideo' : 'playVideo';
//     iframe.postMessage('{"event":"command","func":"' + func + '","args":""}', '*');
// }

// jQuery('#video').popup({
// 	onclose: function() {
// 		toggleVideo('hide');
// 	}
// });

jQuery(document).scroll(function(){
	var scroll = jQuery(this).scrollTop();
	var topDist = jQuery("body").position();
	if (scroll > topDist.top) {
		jQuery('.header').addClass('sticky');
		var header_height = jQuery('.header').height();
		jQuery('.header .button').addClass('scroll');
	} else {
		jQuery('.header').removeClass('sticky');
		jQuery('.header .button').removeClass('scroll');
	}
});