Request.HTML=new Class({Extends:Request,options:{update:false,append:false,evalScripts:true,filter:false,headers:{Accept:"text/html, application/xml, text/xml, */*"}},success:function(i){var j=this.options,d=this.response;var c=i.match(/<script[^>]*>([\s\S]*?)<\/script>/gi);var f=[];if(typeOf(c)!=="null"){for(var g=0;g<c.length;g++){if(c[g].contains('src="')){var b=c[g].match(/src=\"([\s\S]*?)\"/);if(b[1]){f.push(b[1])}}}var a="head.js('"+f.join("','")+"');\n";Browser.exec(a)}d.html=i.stripScripts(function(k){d.javascript=k});var e=d.html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);if(e){d.html=e[1]}var h=new Element("div").set("html",d.html);d.tree=h.childNodes;d.elements=h.getElements("*");if(j.filter){d.tree=d.elements.filter(j.filter)}if(j.update){document.id(j.update).empty().set("html",d.html)}else{if(j.append){document.id(j.append).adopt(h.getChildren())}}if(j.evalScripts){Browser.exec(d.javascript)}this.onSuccess(d.tree,d.elements,d.html,d.javascript)}});Element.implement({keepCenter:function(){this.makeCenter();window.addEvent("scroll",function(){this.makeCenter()}.bind(this));window.addEvent("resize",function(){this.makeCenter()}.bind(this))},makeCenter:function(){var a=window.getWidth()/2-this.getWidth()/2;var b=window.getScrollTop()+(window.getHeight()/2-this.getHeight()/2);this.setStyles({left:a,top:b})}});var Loader=new Class({initialize:function(a){this.spinners={}},getSpinner:function(b,c){c=c?c:"loading";if(typeOf(document.id(b))==="null"){b=false}b=b?b:false;var a=b?b:document.body;if(!this.spinners[b]){this.spinners[b]=new Spinner(a,{message:c})}return this.spinners[b]},start:function(a,b){this.getSpinner(a,b).position().show()},stop:function(a,c,b){this.getSpinner(a,c).destroy();delete this.spinners[a]}});(function(){if(typeof(Fabrik)==="undefined"){Fabrik={};Fabrik.events={};Fabrik.Windows={};Fabrik.loader=new Loader();Fabrik.blocks={};Fabrik.addBlock=function(a,b){Fabrik.blocks[a]=b};Fabrik.iconGen=new IconGenerator({scale:0.5});Fabrik.addEvent=function(b,a){if(!Fabrik.events[b]){Fabrik.events[b]=[]}if(!Fabrik.events[b].contains(a)){Fabrik.events[b].push(a)}};Fabrik.addEvents=function(a){for(var b in a){Fabrik.addEvent(b,a[b])}return this};Fabrik.fireEvent=function(d,b,a){var c=Fabrik.events;if(!c||!c[d]){return this}b=Array.from(b);c[d].each(function(e){if(a){e.delay(a,this,b)}else{e.apply(this,b)}},this);return this}}}());head.ready(function(){Fabrik.tips=new FloatingTips(".fabrikTip",{html:true});Fabrik.addEvent("fabrik.list.updaterows",function(){Fabrik.tips.attach(".fabrikTip")});Fabrik.addEvent("fabrik.plugin.inlineedit.editing",function(){Fabrik.tips.hideAll()})});