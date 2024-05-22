
RGraph=window.RGraph||{isrgraph:true,isRGraph:true,rgraph:true};RGraph.Drawing=RGraph.Drawing||{};RGraph.Drawing.XAxis=function(conf)
{var id=conf.id
var y=conf.y;this.id=id;this.canvas=document.getElementById(this.id);this.context=this.canvas.getContext('2d');this.canvas.__object__=this;this.y=y;this.coords=[];this.coordsText=[];this.original_colors=[];this.firstDraw=true;this.type='drawing.xaxis';this.isRGraph=true;this.isrgraph=true;this.rgraph=true;this.uid=RGraph.createUID();this.canvas.uid=this.canvas.uid?this.canvas.uid:RGraph.createUID();this.properties={marginLeft:25,marginRight:25,colors:['black'],textColor:'black',textFont:'Arial, Verdana, sans-serif',textSize:12,textBold:false,textItalic:false,textAccessible:true,textAccessibleOverflow:'visible',textAccessiblePointerevents:false,xaxisLabels:null,xaxisLabelsPosition:'section',xaxisLabelsCount:5,xaxisLabelsFont:null,xaxisLabelsSize:null,xaxisLabelsColor:null,xaxisLabelsBold:null,xaxisLabelsItalic:null,xaxisLabelsOffsetx:0,xaxisLabelsOffsety:0,xaxisLabelsAngle:0,xaxisTickmarksAlign:'bottom',xaxisTickmarksCount:5,xaxisTickmarksLastLeft:true,xaxisTickmarksLastRight:true,xaxisScaleVisible:true,xaxisScaleFormatter:null,xaxisScaleDecimals:0,xaxisScalePoint:'.',xaxisScaleThousand:',',xaxisScaleInvert:false,xaxisScaleZerostart:true,xaxisScaleUnitsPre:'',xaxisScaleUnitsPost:'',xaxisTitle:'',xaxisTitleFont:null,xaxisTitleSize:null,xaxisTitleColor:null,xaxisTitleBold:null,xaxisTitleItalic:null,xaxisTickmarksCount:null,xaxis:true,xaxisScaleMax:null,xaxisScaleMin:0,xaxisPosition:'bottom',yaxisPosition:'left',marginInner:0,linewidth:1,tooltips:null,tooltipsEffect:'fade',tooltipsCssClass:'RGraph_tooltip',tooltipsEvent:'onclick',clearto:'rgba(0,0,0,0)'}
if(!this.canvas){alert('[DRAWING.XAXIS] No canvas support');return;}
this.$0={};if(!this.canvas.__rgraph_aa_translated__){this.context.translate(0.5,0.5);this.canvas.__rgraph_aa_translated__=true;}
var prop=this.properties;this.path=RGraph.pathObjectFunction;if(RGraph.Effects&&typeof RGraph.Effects.decorate==='function'){RGraph.Effects.decorate(this);}
this.set=function(name)
{var value=typeof arguments[1]==='undefined'?null:arguments[1];if(arguments.length===1&&typeof arguments[0]==='object'){for(i in arguments[0]){if(typeof i==='string'){this.set(i,arguments[0][i]);}}
return this;}
prop[name]=value;return this;};this.get=function(name)
{return prop[name];};this.draw=function()
{RGraph.fireCustomEvent(this,'onbeforedraw');this.coordsText=[];this.marginLeft=prop.marginLeft;this.marginRight=prop.marginRight;if(!this.colorsParsed){this.parseColors();this.colorsParsed=true;}
this.drawXAxis();RGraph.installEventListeners(this);if(this.firstDraw){this.firstDraw=false;RGraph.fireCustomEvent(this,'onfirstdraw');this.firstDrawFunc();}
RGraph.fireCustomEvent(this,'ondraw');return this;};this.exec=function(func)
{func(this);return this;};this.getObjectByXY=function(e)
{if(this.getShape(e)){return this;}};this.getShape=function(e)
{var mouseXY=RGraph.getMouseXY(e);var mouseX=mouseXY[0];var mouseY=mouseXY[1];if(mouseX>=this.marginLeft&&mouseX<=(this.canvas.width-this.marginRight)&&mouseY>=this.y-(prop.xaxisTickmarksAlign=='top'?(prop.textSize*1.5)+5:0)&&mouseY<=(this.y+(prop.xaxisTickmarksAlign=='top'?0:(prop.textSize*1.5)+5))){var x=this.marginLeft;var y=this.y;var w=this.canvas.width-this.marginLeft-this.marginRight;var h=25;if(RGraph.parseTooltipText&&prop.tooltips){var tooltip=RGraph.parseTooltipText(prop.tooltips[0],0);}
return{object:this,x:x,y:y,width:w,height:h,dataset:0,index:0,sequentialIndex:0,tooltip:typeof tooltip==='string'?tooltip:null};}
return null;};this.highlight=function(shape)
{if(typeof prop.highlightStyle==='function'){(prop.highlightStyle)(shape);}};this.parseColors=function()
{if(this.original_colors.length===0){this.original_colors.colors=RGraph.arrayClone(prop.colors),this.original_colors.textColor=RGraph.arrayClone(prop.textColor),this.original_colors.xaxisLabelsColor=RGraph.arrayClone(prop.xaxisLabelsColor),this.original_colors.xaxisTitleColor=RGraph.arrayClone(prop.xaxisTitleColor)}
prop.colors[0]=this.parseSingleColorForGradient(prop.colors[0]);prop.textColor=this.parseSingleColorForGradient(prop.textColor);prop.xaxisLabelsColor=this.parseSingleColorForGradient(prop.xaxisLabelsColor);prop.xaxisTitleColor=this.parseSingleColorForGradient(prop.xaxisTitleColor);};this.reset=function()
{};this.parseSingleColorForGradient=function(color)
{if(!color){return color;}
if(typeof color==='string'&&color.match(/^gradient\((.*)\)$/i)){if(color.match(/^gradient\(({.*})\)$/i)){return RGraph.parseJSONGradient({object:this,def:RegExp.$1});}
var parts=RegExp.$1.split(':');var grad=this.context.createLinearGradient(prop.marginLeft,0,this.canvas.width-prop.marginRight,0);var diff=1/(parts.length-1);grad.addColorStop(0,RGraph.trim(parts[0]));for(var j=1,len=parts.length;j<len;++j){grad.addColorStop(j*diff,RGraph.trim(parts[j]));}}
return grad?grad:color;};this.drawXAxis=function()
{var marginLeft=prop.marginLeft,marginRight=prop.marginRight,x=this.marginLeft,y=this.y,min=+prop.xaxisScaleMin,max=+prop.xaxisScaleMax,labels=prop.xaxisLabels,labels_offsetx=prop.xaxisLabelsOffsetx,labels_offsety=prop.xaxisLabelsOffsety,labels_position=prop.xaxisLabelsPosition,color=prop.colors[0],title_color=prop.xaxisTitleColor,width=this.canvas.width-this.marginLeft-this.marginRight,align=prop.xaxisTickmarksAlign,numlabels=prop.xaxisLabelsCount,formatter=prop.xaxisScaleFormatter,decimals=Number(prop.xaxisScaleDecimals),invert=prop.xaxisScaleInvert,scale_visible=prop.xaxisScaleVisible,units_pre=prop.xaxisScaleUnitsPre,units_post=prop.xaxisScaleUnitsPost,title=prop.xaxisTitle
numticks=prop.xaxisTickmarksCount,hmargin=prop.marginInner,linewidth=prop.linewidth,leftendtick=prop.xaxisTickmarksLastLeft,rightendtick=prop.xaxisTickmarksLastRight,noxaxis=!prop.xaxis,xaxispos=prop.xaxisPosition,yaxispos=prop.yaxisPosition
if(RGraph.isNull(numticks)){if(labels&&labels.length){numticks=labels.length;}else if(!labels&&max!=0){numticks=10;}else{numticks=numlabels;}}
this.context.lineWidth=linewidth+0.001;this.context.strokeStyle=color;if(!noxaxis){this.path({path:'b m % % l % % s %',args:[x,Math.round(y),x+width,Math.round(y),this.context.strokeStyle]});this.context.beginPath();for(var i=(leftendtick?0:1);i<=(numticks-(rightendtick?0:1));++i){if(yaxispos==='center'&&i===(numticks/2)){continue;}
this.context.moveTo(Math.round(x+((width/numticks)*i)),xaxispos==='center'?(align==='bottom'?y-3:y+3):y);this.context.lineTo(Math.round(x+((width/numticks)*i)),y+(align=='bottom'?3:-3));}
this.context.stroke();}
if(labels){var textConf=RGraph.getTextConf({object:this,prefix:'xaxisLabels'});numlabels=labels.length;var h=0;var l=0;var single_line=RGraph.measureText('Mg',false,textConf.font,textConf.size);for(var i=0,len=labels.length;i<len;++i){var dimensions=RGraph.measureText(labels[i],false,textConf.font,textConf.size);var h=Math.max(h,dimensions[1]);var l=Math.max(l,labels[i].split('\r\n').length);}
for(var i=0,len=labels.length;i<len;++i){if(labels_position=='edge'){var x=((((width-hmargin-hmargin)/(labels.length-1))*i)+marginLeft+hmargin);}else{var graphWidth=(width-hmargin-hmargin);var label_segment_width=(graphWidth/labels.length);var x=((label_segment_width*i)+(label_segment_width/2)+marginLeft+hmargin);}
RGraph.text({object:this,font:textConf.font,size:textConf.size,color:textConf.color,bold:textConf.bold,italic:textConf.italic,x:x+labels_offsetx,y:(align=='bottom'?y+5:y-5-h+single_line[1])+labels_offsety,text:String(labels[i]),valign:align=='bottom'?'top':'bottom',halign:prop.xaxisLabelsAngle!==0?'right':'center',angle:prop.xaxisLabelsAngle* -1,tag:'labels'});}}else if(scale_visible){if(!max){alert('[DRAWING.XAXIS] If not specifying xaxisLabels you must specify xaxisScaleMax!');}
if(yaxispos=='center'){width/=2;var additionalX=width;}else{var additionalX=0;}
var textConf=RGraph.getTextConf({object:this,prefix:'xaxisLabels'});for(var i=0;i<=numlabels;++i){if(i==0&&!prop.xaxisScaleZerostart){continue;}
var original=(((max-min)/numlabels)*i)+min;var hmargin=prop.marginInner;if(typeof formatter==='function'){var text=formatter(this,original)}else{text=RGraph.numberFormat({object:this,number:original.toFixed(original===0?0:decimals),unitspre:units_pre,unitspost:units_post,point:prop.xaxisScalePoint,thousand:prop.xaxisScaleThousand});}
if(invert){var x=((width-hmargin-((width-hmargin-hmargin)/numlabels)*i))+marginLeft+additionalX+labels_offsetx;}else{var x=(((width-hmargin-hmargin)/numlabels)*i)+marginLeft+hmargin+additionalX+labels_offsetx;}
RGraph.text({object:this,font:textConf.font,size:textConf.size,color:textConf.color,bold:textConf.bold,italic:textConf.italic,x:x,y:(align=='bottom'?y+5:y-5)+labels_offsety,text:text,valign:align=='bottom'?'top':'bottom',halign:prop.xaxisLabelsAngle!==0?'right':'center',angle:prop.xaxisLabelsAngle* -1,tag:'scale'});}
if(yaxispos=='center'){for(var i=0;i<numlabels;++i){var original=(((max-min)/numlabels)*(numlabels-i))+min;var hmargin=prop.marginInner;var text=String(typeof formatter=='function'?formatter(this,original):RGraph.numberFormat({object:this,number:original.toFixed(decimals),unitspre:units_pre,unitspost:units_post}));if(invert){var x=((width-hmargin-((width-hmargin-hmargin)/numlabels)*i))+marginLeft;}else{var x=(((width-hmargin-hmargin)/numlabels)*i)+marginLeft+hmargin;}
RGraph.text({object:this,font:textConf.font,size:textConf.size,color:textConf.color,bold:textConf.bold,italic:textConf.italic,x:x,y:align=='bottom'?y+5:y-5,'text':'-'+text,valign:align=='bottom'?'top':'bottom',halign:'center',tag:'scale'});}}}
if(title){var textConf=RGraph.getTextConf({object:this,prefix:'xaxisTitle'});var dimensions=RGraph.measureText({text:title,bold:textConf.bold,font:textConf.font,size:textConf.size});RGraph.text({object:this,font:textConf.font,size:textConf.size,color:textConf.color,bold:textConf.bold,italic:textConf.italic,x:(this.canvas.width-this.marginLeft-this.marginRight)/2+this.marginLeft,y:align=='bottom'?y+dimensions[1]+5:y-dimensions[1]-5,text:title,valign:'top',halign:'center',tag:'title'});}};this.on=function(type,func)
{if(type.substr(0,2)!=='on'){type='on'+type;}
if(typeof this[type]!=='function'){this[type]=func;}else{RGraph.addCustomEventListener(this,type,func);}
return this;};this.firstDrawFunc=function()
{};RGraph.register(this);RGraph.parseObjectStyleConfig(this,conf.options);};