
RGraph=window.RGraph||{isrgraph:true,isRGraph:true,rgraph:true};RGraph.Effects=RGraph.Effects||{};RGraph.Effects.Rose=RGraph.Effects.Rose||{};RGraph.Rose=function(conf)
{this.id=conf.id;this.canvas=document.getElementById(this.id);this.context=this.canvas.getContext?this.canvas.getContext("2d"):null;this.data=conf.data;this.canvas.__object__=this;this.type='rose';this.isRGraph=true;this.isrgraph=true;this.rgraph=true;this.uid=RGraph.createUID();this.canvas.uid=this.canvas.uid?this.canvas.uid:RGraph.createUID();this.colorsParsed=false;this.coordsText=[];this.original_colors=[];this.firstDraw=true;this.centerx=0;this.centery=0;this.radius=0;this.max=0;this.angles=[];this.angles2=[];this.properties={axes:false,axesColor:'black',axesLinewidth:1,axesTickmarks:true,backgroundGrid:true,backgroundGridColor:'#ccc',backgroundGridSize:null,backgroundGridRadialsCount:null,backgroundGridRadialsOffset:0,backgroundGridCirclesCount:5,centerx:null,centery:null,radius:null,anglesStart:0,linewidth:1,colors:['rgba(255,0,0,0.5)','rgba(255,255,0,0.5)','rgba(0,255,255,0.5)','rgb(0,255,0)','gray','blue','rgb(255,128,255)','green','pink','gray','aqua'],colorsSequential:false,colorsAlpha:null,colorsStroke:'rgba(0,0,0,0)',margin:5,marginLeft:25,marginRight:25,marginTop:25,marginBottom:25,shadow:false,shadowColor:'#aaa',shadowOffsetx:0,shadowOffsety:0,shadowBlur:15,title:'',titleBackground:null,titleHpos:null,titleVpos:null,titleBold:null,titleFont:null,titleSize:null,titleItalic:null,titleColor:null,titleX:null,titleY:null,titleHalign:null,titleValign:null,labels:null,labelsColor:null,labelsFont:null,labelsSize:null,labelsBold:null,labelsItalic:null,labelsPosition:'center',labelsBoxed:false,labelsOffset:0,labelsAxes:'n',labelsAxesFont:null,labelsAxesSize:null,labelsAxesColor:null,labelsAxesBold:null,labelsAxesItalic:null,labelsAxesCount:5,textColor:'black',textFont:'Arial, Verdana, sans-serif',textSize:12,textBold:false,textItalic:false,textAccessible:true,textAccessibleOverflow:'visible',textAccessiblePointerevents:false,key:null,keyBackground:'white',keyPosition:'graph',keyHalign:'right',keyShadow:false,keyShadowColor:'#666',keyShadowBlur:3,keyShadowOffsetx:2,keyShadowOffsety:2,keyPositionGutterBoxed:false,keyPositionX:null,keyPositionY:null,keyColorShape:'square',keyRounded:true,keyLinewidth:1,keyColors:null,keyInteractive:false,keyInteractiveHighlightChartStroke:'black',keyInteractiveHighlightChartFill:'rgba(255,255,255,0.7)',keyInteractiveHighlightLabel:'rgba(255,0,0,0.2)',keyLabelsColor:null,keyLabelsFont:null,keyLabelsSize:null,keyLabelsBold:null,keyLabelsItalic:null,keyLabelsOffsetx:0,keyLabelsOffsety:0,contextmenu:null,tooltips:null,tooltipsEvent:'onclick',tooltipsEffect:'fade',tooltipsCssClass:'RGraph_tooltip',tooltipsHighlight:true,highlightStroke:'rgba(0,0,0,0)',highlightFill:'rgba(255,255,255,0.7)',annotatable:false,annotatableColor:'black',annotatableLinewidth:1,resizable:false,resizableHandleAdjust:[0,0],resizableHandleBackground:null,adjustable:false,scaleMax:null,scaleMin:0,scaleDecimals:null,scalePoint:'.',scaleThousand:',',scaleUnitsPre:'',scaleUnitsPost:'',variant:'stacked',variantThreedDepth:10,exploded:0,animationRoundrobinFactor:1,animationRoundrobinRadius:true,animationGrowMultiplier:1,segmentHighlight:false,segmentHighlightCount:null,segmentHighlightFill:'rgba(0,255,0,0.5)',segmentHighlightStroke:'rgba(0,0,0,0)',clearto:'rgba(0,0,0,0)'}
for(var i=0;i<this.data.length;++i){if(typeof this.data[i]==='string'){this.data[i]=parseFloat(this.data[i]);}else if(typeof this.data[i]==='object'){for(var j=0;j<this.data[i].length;++j){if(typeof this.data[i][j]==='string'){this.data[i][j]=parseFloat(this.data[i][j]);}}}}
var linear_data=RGraph.arrayLinearize(this.data);this.data_seq=linear_data;for(var i=0;i<linear_data.length;++i){this["$"+i]={};}
if(!this.canvas.__rgraph_aa_translated__){this.context.translate(0.5,0.5);this.canvas.__rgraph_aa_translated__=true;}
var prop=this.properties;this.path=RGraph.pathObjectFunction;if(RGraph.Effects&&typeof RGraph.Effects.decorate==='function'){RGraph.Effects.decorate(this);}
this.responsive=RGraph.responsive;this.set=function(name)
{var value=typeof arguments[1]==='undefined'?null:arguments[1];if(arguments.length===1&&typeof arguments[0]==='object'){for(i in arguments[0]){if(typeof i==='string'){this.set(i,arguments[0][i]);}}
return this;}
prop[name]=value;return this;};this.get=function(name)
{return prop[name];};this.draw=function()
{RGraph.fireCustomEvent(this,'onbeforedraw');this.marginLeft=prop.marginLeft;this.marginRight=prop.marginRight;this.marginTop=prop.marginTop;this.marginBottom=prop.marginBottom;this.radius=(Math.min(this.canvas.width-this.marginLeft-this.marginRight,this.canvas.height-this.marginTop-this.marginBottom)/2);this.centerx=((this.canvas.width-this.marginLeft-this.marginRight)/2)+this.marginLeft;this.centery=((this.canvas.height-this.marginTop-this.marginBottom)/2)+this.marginTop;this.angles=[];this.angles2=[];this.total=0;this.startRadians=prop.anglesStart;this.coordsText=[];if(prop.key&&prop.key.length>0&&prop.key.length>=3){this.centerx=this.centerx-this.marginRight+5;}
if(typeof prop.centerx=='number')this.centerx=prop.centerx;if(typeof prop.centery=='number')this.centery=prop.centery;if(typeof prop.radius=='number')this.radius=prop.radius;if(!this.colorsParsed){this.parseColors();this.colorsParsed=true;}
if(prop.variant.indexOf('3d')!==-1){var scaleX=1.5;this.context.setTransform(scaleX,0,0,1,(this.canvas.width*scaleX-this.canvas.width)* -0.5,0);}
this.drawBackground();if(prop.variant.indexOf('3d')!==-1){RGraph.setShadow(this,'rgba(0,0,0,0.35)',0,15,25);for(var i=prop.variantThreedDepth;i>0;i-=1){this.centery-=1;this.drawRose({storeAngles:false});RGraph.noShadow(this);for(var j=0,len=this.angles.length;j<len;j+=1){var a=this.angles[j];this.path({path:'b m % % a % % % % % false c f rgba(0,0,0,0.1) c f rgba(0,0,0,0.1)',args:[a[4],a[5],a[4],a[5],a[3]+1.5,a[0]-0.01,a[1]+0.01,false]});}}}
this.drawRose();this.drawLabels();this.context.strokeStyle='rgba(0,0,0,0)'
if(prop.contextmenu){RGraph.showContext(this);}
if(prop.resizable){RGraph.allowResizing(this);}
if(prop.adjustable){RGraph.allowAdjusting(this);}
RGraph.installEventListeners(this);if(prop.segmentHighlight){if(!RGraph.allowSegmentHighlight){alert('[WARNING] The segment highlight function does not exist - have you included the dynamic library?');}
RGraph.allowSegmentHighlight({object:this,count:typeof prop.segmentHighlightCount==='number'?prop.segmentHighlightCount:this.data.length,fill:prop.segmentHighlightFill,stroke:prop.segmentHighlightStroke});}
if(this.firstDraw){this.firstDraw=false;RGraph.fireCustomEvent(this,'onfirstdraw');this.firstDrawFunc();}
RGraph.fireCustomEvent(this,'ondraw');return this;};this.exec=function(func)
{func(this);return this;};this.drawBackground=function()
{this.context.lineWidth=1;if(prop.backgroundGridCirclesCount){if(typeof(prop.backgroundGridCirclesCount)=='number'){prop.backgroundGridCirclesSize=this.radius/prop.backgroundGridCirclesCount;}
this.context.beginPath();this.context.strokeStyle=prop.backgroundGridColor;for(var i=prop.backgroundGridCirclesSize;i<=this.radius;i+=prop.backgroundGridCirclesSize){this.context.moveTo(this.centerx+i,this.centery);this.context.arc(this.centerx,this.centery,i,0,RGraph.TWOPI,false);}
this.context.stroke();this.context.beginPath();if(typeof prop.backgroundGridRadialsCount!=='number'){prop.backgroundGridRadialsCount=this.data.length}
if(prop.backgroundGridRadialsCount>0){var num=(360/prop.backgroundGridRadialsCount);var offset=prop.backgroundGridRadialsOffset;for(var i=0;i<=360;i+=num){this.context.arc(this.centerx,this.centery,this.radius,((i/(180/RGraph.PI))-RGraph.HALFPI)+this.startRadians+offset,(((i+0.0001)/(180/RGraph.PI))-RGraph.HALFPI)+this.startRadians+offset,false);this.context.lineTo(this.centerx,this.centery);}
this.context.stroke();}}
if(prop.axes){this.context.beginPath();this.context.strokeStyle=prop.axesColor;this.context.lineWidth=prop.axesLinewidth;this.context.moveTo(this.centerx-this.radius,Math.round(this.centery));this.context.lineTo(this.centerx+this.radius,Math.round(this.centery));if(prop.axesTickmarks){this.context.moveTo(Math.round(this.centerx-this.radius),this.centery-5);this.context.lineTo(Math.round(this.centerx-this.radius),this.centery+5);this.context.moveTo(Math.round(this.centerx+this.radius),this.centery-5);this.context.lineTo(Math.round(this.centerx+this.radius),this.centery+5);for(var i=(this.centerx-this.radius);i<(this.centerx+this.radius);i+=(this.radius/5)){this.context.moveTo(Math.round(i),this.centery-3);this.context.lineTo(Math.round(i),this.centery+3.5);}
for(var i=(this.centery-this.radius);i<(this.centery+this.radius);i+=(this.radius/5)){this.context.moveTo(this.centerx-3,Math.round(i));this.context.lineTo(this.centerx+3,Math.round(i));}}
this.context.moveTo(Math.round(this.centerx),this.centery-this.radius);this.context.lineTo(Math.round(this.centerx),this.centery+this.radius);if(prop.axesTickmarks){this.context.moveTo(this.centerx-5,Math.round(this.centery-this.radius));this.context.lineTo(this.centerx+5,Math.round(this.centery-this.radius));this.context.moveTo(this.centerx-5,Math.round(this.centery+this.radius));this.context.lineTo(this.centerx+5,Math.round(this.centery+this.radius));}
this.context.closePath();this.context.stroke();}
this.path({path:'b c'});};this.drawRose=function()
{var max=0,data=this.data,margin=RGraph.toRadians(prop.margin),opt=arguments[0]||{};this.context.lineWidth=prop.linewidth;if(RGraph.isNull(prop.scaleMax)){for(var i=0;i<data.length;++i){if(typeof data[i]=='number'){max=Math.max(max,data[i]);}else if(typeof data[i]=='object'&&prop.variant.indexOf('non-equi-angular')!==-1){max=Math.max(max,data[i][0]);}else{max=Math.max(max,RGraph.arraySum(data[i]));}}
this.scale2=RGraph.getScale({object:this,options:{'scale.max':max,'scale.min':0,'scale.thousand':prop.scaleThousand,'scale.point':prop.scalePoint,'scale.decimals':prop.scaleDecimals,'scale.labels.count':prop.labelsAxesCount,'scale.round':prop.scaleRound,'scale.units.pre':prop.scaleUnitsPre,'scale.units.post':prop.scaleUnitsPost}});this.max=this.scale2.max;}else{var ymax=prop.scaleMax;this.scale2=RGraph.getScale({object:this,options:{'scale.max':ymax,'scale.strict':true,'scale.thousand':prop.scaleThousand,'scale.point':prop.scalePoint,'scale.decimals':prop.scaleDecimals,'scale.labels.count':prop.labelsAxesCount,'scale.round':prop.scaleRound,'scale.units.pre':prop.scaleUnitsPre,'scale.units.post':prop.scaleUnitsPost}});this.max=this.scale2.max}
this.sum=RGraph.arraySum(data);this.context.moveTo(this.centerx,this.centery);this.context.stroke();if(prop.colorsAlpha){this.context.globalAlpha=prop.colorsAlpha;}
var sequentialIndex=0;if(typeof(prop.variant)=='string'&&prop.variant.indexOf('non-equi-angular')!==-1){var total=0;for(var i=0;i<data.length;++i){total+=data[i][1];}
if(prop.shadow){RGraph.setShadow(this,prop.shadowColor,prop.shadowOffsetx,prop.shadowOffsety,prop.shadowBlur);}
for(var i=0;i<this.data.length;++i){var segmentRadians=((this.data[i][1]/total)*RGraph.TWOPI);var radius=((this.data[i][0]-prop.scaleMin)/(this.max-prop.scaleMin))*this.radius;radius=radius*prop.animationGrowMultiplier;this.context.strokeStyle=prop.colorsStroke;this.context.fillStyle=prop.colors[0];if(prop.colorsSequential){this.context.fillStyle=prop.colors[i];}
this.context.beginPath();var startAngle=(this.startRadians*prop.animationRoundrobinFactor)-RGraph.HALFPI+margin;var endAngle=((this.startRadians+segmentRadians)*prop.animationRoundrobinFactor)-RGraph.HALFPI-margin;var exploded=this.getExploded(i,startAngle,endAngle,prop.exploded);var explodedX=exploded[0];var explodedY=exploded[1];this.context.arc(this.centerx+explodedX,this.centery+explodedY,prop.animationRoundrobinRadius?radius*prop.animationRoundrobinFactor:radius,startAngle,endAngle,0);this.context.lineTo(this.centerx+explodedX,this.centery+explodedY);this.context.closePath();this.context.stroke();this.context.fill();this.angles[i]=[startAngle,endAngle,0,prop.animationRoundrobinRadius?radius*prop.animationRoundrobinFactor:radius,this.centerx+explodedX,this.centery+explodedY,this.context.strokeStyle,this.context.fillStyle];sequentialIndex++;this.startRadians+=segmentRadians;}
if(prop.shadow){RGraph.noShadow(this);this.redrawRose();}
if(prop.linewidth>1){this.restrokeRose();}}else{var sequentialColorIndex=0;if(prop.shadow){RGraph.setShadow(this,prop.shadowColor,prop.shadowOffsetx,prop.shadowOffsety,prop.shadowBlur);}
for(var i=0;i<this.data.length;++i){var segmentRadians=(1/this.data.length)*RGraph.TWOPI;if(typeof this.data[i]=='number'){this.context.beginPath();this.context.strokeStyle=prop.colorsStroke;this.context.fillStyle=prop.colors[0];if(prop.colorsSequential){this.context.fillStyle=prop.colors[i];}
var radius=((this.data[i]-prop.scaleMin)/(this.max-prop.scaleMin))*this.radius;radius=radius*prop.animationGrowMultiplier;var startAngle=(this.startRadians*prop.animationRoundrobinFactor)-RGraph.HALFPI+margin;var endAngle=(this.startRadians*prop.animationRoundrobinFactor)+(segmentRadians*prop.animationRoundrobinFactor)-RGraph.HALFPI-margin;var exploded=this.getExploded(i,startAngle,endAngle,prop.exploded);var explodedX=exploded[0];var explodedY=exploded[1];this.context.arc(this.centerx+explodedX,this.centery+explodedY,prop.animationRoundrobinRadius?radius*prop.animationRoundrobinFactor:radius,startAngle,endAngle,0);this.context.lineTo(this.centerx+explodedX,this.centery+explodedY);this.context.closePath();this.context.fill();this.context.stroke();this.context.beginPath();if(endAngle==0){}
this.angles[i]=[startAngle,endAngle,0,radius*prop.animationRoundrobinFactor,this.centerx+explodedX,this.centery+explodedY,this.context.strokeStyle,this.context.fillStyle];sequentialIndex++;}else if(typeof(this.data[i])=='object'){var margin=prop.margin/(180/RGraph.PI);if(!this.angles2[i]){this.angles2[i]=[];}
for(var j=0;j<this.data[i].length;++j){var startAngle=(this.startRadians*prop.animationRoundrobinFactor)-RGraph.HALFPI+margin;var endAngle=(this.startRadians*prop.animationRoundrobinFactor)+(segmentRadians*prop.animationRoundrobinFactor)-RGraph.HALFPI-margin;var exploded=this.getExploded(i,startAngle,endAngle,prop.exploded);var explodedX=exploded[0];var explodedY=exploded[1];this.context.strokeStyle=prop.colorsStroke;this.context.fillStyle=prop.colors[j];if(prop.colorsSequential){this.context.fillStyle=prop.colors[sequentialColorIndex++];}
if(j==0){this.context.beginPath();var startRadius=0;var endRadius=((this.data[i][j]-prop.scaleMin)/(this.max-prop.scaleMin))*this.radius;endRadius=endRadius*prop.animationGrowMultiplier;this.context.arc(this.centerx+explodedX,this.centery+explodedY,prop.animationRoundrobinRadius?endRadius*prop.animationRoundrobinFactor:endRadius,startAngle,endAngle,0);this.context.lineTo(this.centerx+explodedX,this.centery+explodedY);this.context.closePath();this.context.stroke();this.context.fill();this.angles[sequentialIndex++]=[startAngle,endAngle,0,endRadius*prop.animationRoundrobinFactor,this.centerx+explodedX,this.centery+explodedY,this.context.strokeStyle,this.context.fillStyle];this.angles2[i][j]=[startAngle,endAngle,0,endRadius*prop.animationRoundrobinFactor,this.centerx+explodedX,this.centery+explodedY,this.context.strokeStyle,this.context.fillStyle];}else{this.context.beginPath();var startRadius=endRadius;var endRadius=(((this.data[i][j]-prop.scaleMin)/(this.max-prop.scaleMin))*this.radius)+startRadius;endRadius=endRadius*prop.animationGrowMultiplier;this.context.arc(this.centerx+explodedX,this.centery+explodedY,startRadius*prop.animationRoundrobinFactor,startAngle,endAngle,0);this.context.arc(this.centerx+explodedX,this.centery+explodedY,endRadius*prop.animationRoundrobinFactor,endAngle,startAngle,true);this.context.closePath();this.context.stroke();this.context.fill();this.angles[sequentialIndex++]=[startAngle,endAngle,startRadius*prop.animationRoundrobinFactor,endRadius*prop.animationRoundrobinFactor,this.centerx+explodedX,this.centery+explodedY,this.context.strokeStyle,this.context.fillStyle];this.angles2[i][j]=[startAngle,endAngle,startRadius*prop.animationRoundrobinFactor,endRadius*prop.animationRoundrobinFactor,this.centerx+explodedX,this.centery+explodedY,this.context.strokeStyle,this.context.fillStyle];}}}
this.startRadians+=segmentRadians;}
if(prop.shadow){RGraph.noShadow(this);}
if(prop.shadow){this.redrawRose();}
if(prop.linewidth>1){this.restrokeRose();}
if(prop.shadow){this.redrawRose();}}
if(prop.colorsAlpha){this.context.globalAlpha=1;}
if(prop.title){RGraph.drawTitle(this,prop.title,(this.canvas.height/2)-this.radius,this.centerx,prop.titleSize?prop.titleSize:prop.textSize);}};this.restrokeRose=function()
{var angles=this.angles;for(var i=0;i<angles.length;++i){this.path('b a % % % % % false a % % % % % true c s %',angles[i][4],angles[i][5],angles[i][2],angles[i][0],angles[i][1],angles[i][4],angles[i][5],angles[i][3],angles[i][1],angles[i][0],angles[i][6],);}};this.redrawRose=function()
{var angles=this.angles;for(var i=0;i<angles.length;++i){this.path({path:'b a % % % % % false a % % % % % true c f % f % ',args:[angles[i][4],angles[i][5],angles[i][2],angles[i][0],angles[i][1],angles[i][4],angles[i][5],angles[i][3],angles[i][1],angles[i][0],angles[i][6],angles[i][7]]});}};this.drawLabels=function()
{this.context.lineWidth=1;var key=prop.key;if(key&&key.length){RGraph.drawKey(this,key,prop.colors);}
this.context.fillStyle=prop.textColor;this.context.strokeStyle='black';var radius=this.radius,font=prop.textFont,size=prop.textSize,axes=prop.labelsAxes.toLowerCase(),decimals=prop.scaleDecimals,units_pre=prop.scaleUnitsPre,units_post=prop.scaleUnitsPost,centerx=this.centerx,centery=this.centery+(prop.variant.indexOf('3d')!==-1?prop.variantThreedDepth:0);if(typeof prop.labels=='object'&&prop.labels){this.drawCircularLabels(this.context,prop.labels,font,size,radius+10);}
if(typeof(prop.textSize)=='number'){size=prop.textSize;}
var color='rgba(255,255,255,0.8)';if(axes.indexOf('n')>-1){if(prop.backgroundAxes){var offset=-10;var halign='right';}else{var offset=0;var halign='center';}
var textConf=RGraph.getTextConf({object:this,prefix:'labelsAxes'});for(var i=0;i<prop.labelsAxesCount;++i){RGraph.text({object:this,font:textConf.font,size:textConf.size,color:textConf.color,bold:textConf.bold,italic:textConf.italic,'x':centerx+offset,'y':centery-(radius*((i+1)/prop.labelsAxesCount)),'text':this.scale2.labels[i],'valign':'center','halign':halign,'bounding':true,'bounding.fill':color,'bounding.stroke':'rgba(0,0,0,0)','tag':'scale'});}}
if(axes.indexOf('s')>-1){if(prop.backgroundAxes){var offset=-10;var halign='right';}else{var offset=0;var halign='center';}
for(var i=0;i<prop.labelsAxesCount;++i){RGraph.text({object:this,font:textConf.font,size:textConf.size,color:textConf.color,bold:textConf.bold,italic:textConf.italic,'x':centerx+offset,'y':centery+(radius*((i+1)/prop.labelsAxesCount)),'text':this.scale2.labels[i],'valign':'center','halign':halign,'bounding':true,'bounding.fill':color,'bounding.stroke':'rgba(0,0,0,0)','tag':'scale'});}}
if(axes.indexOf('e')>-1){for(var i=0;i<prop.labelsAxesCount;++i){if(prop.backgroundAxes){var offset=10;var valign='top';}else{var offset=0;var valign='center';}
RGraph.text({object:this,font:textConf.font,size:textConf.size,color:textConf.color,bold:textConf.bold,italic:textConf.italic,'x':centerx+(radius*((i+1)/prop.labelsAxesCount)),'y':centery+offset,'text':this.scale2.labels[i],'valign':valign,'halign':'center','bounding':true,'bounding.fill':color,'bounding.stroke':'rgba(0,0,0,0)','tag':'scale'});}}
if(axes.indexOf('w')>-1){for(var i=0;i<prop.labelsAxesCount;++i){if(prop.backgroundAxes){var offset=10;var valign='top';}else{var offset=0;var valign='center';}
RGraph.text({object:this,font:textConf.font,size:textConf.size,color:textConf.color,bold:textConf.bold,italic:textConf.italic,'x':centerx-(radius*((i+1)/prop.labelsAxesCount)),'y':centery+offset,'text':this.scale2.labels[i],'valign':valign,'halign':'center','bounding':true,'bounding.fill':color,'bounding.stroke':'rgba(0,0,0,0)','tag':'scale'});}}
if(RGraph.trim(axes).length>0){RGraph.text({object:this,font:textConf.font,size:textConf.size,color:textConf.color,bold:textConf.bold,italic:textConf.italic,'x':centerx,'y':centery,'text':typeof prop.scaleMin==='number'?RGraph.numberFormat({object:this,number:Number(prop.scaleMin).toFixed(prop.scaleMin===0?'0':prop.scaleDecimals),unitspre:units_pre,unitspost:units_post}):'0','valign':'center','halign':'center','bounding':true,'bounding.fill':color,'bounding.stroke':'rgba(0,0,0,0)','tag':'scale'});}};this.drawCircularLabels=function(context,labels,font,size,radius)
{var variant=prop.variant,position=prop.labelsPosition,radius=radius+5+prop.labelsOffset,centerx=this.centerx,centery=this.centery+(prop.variant.indexOf('3d')!==-1?prop.variantThreedDepth:0),labelsColor=prop.labelsColor||prop.textColor,angles=this.angles
var textConf=RGraph.getTextConf({object:this,prefix:'labels'});for(var i=0;i<this.data.length;++i){if(typeof(variant)=='string'&&variant.indexOf('non-equi-angular')!==-1){var a=Number(angles[i][0])+((angles[i][1]-angles[i][0])/2);}else{var a=(RGraph.TWOPI/this.data.length)*(i+1)-(RGraph.TWOPI/(this.data.length*2));var a=a-RGraph.HALFPI+(prop.labelsPosition=='edge'?((RGraph.TWOPI/this.data.length)/2):0);}
var x=centerx+(Math.cos(a)*radius);var y=centery+(Math.sin(a)*radius);if(x>centerx){halign='left';}else if(Math.round(x)==centerx){halign='center';}else{halign='right';}
RGraph.text({object:this,font:textConf.font,size:textConf.size,color:textConf.color,bold:textConf.bold,italic:textConf.italic,x:x,y:y,text:String(labels[i]||''),halign:halign,valign:'center',tag:'labels'});}};this.getShape=function(e)
{var angles=this.angles;var ret=[];var opt=arguments[1]?arguments[1]:{radius:true};for(var i=0;i<angles.length;++i){var angleStart=angles[i][0];var angleEnd=angles[i][1];var radiusStart=opt.radius===false?0:angles[i][2];var radiusEnd=opt.radius===false?this.radius:angles[i][3];var centerX=angles[i][4];var centerY=angles[i][5];var mouseXY=RGraph.getMouseXY(e);var mouseX=mouseXY[0]-centerX;var mouseY=mouseXY[1]-centerY;this.context.beginPath();this.context.arc(centerX,centerY,radiusStart?radiusStart:0.01,angleStart,angleEnd,false);this.context.arc(centerX,centerY,radiusEnd,angleEnd,angleStart,true);this.context.closePath();if(this.context.isPointInPath(mouseXY[0],mouseXY[1])){angles[i][6]=i;if(RGraph.parseTooltipText){var tooltip=RGraph.parseTooltipText(prop.tooltips,angles[i][6]);}
var indexes=RGraph.sequentialIndexToGrouped(i,this.data);angles[i].object=this;angles[i].x=angles[i][4];angles[i].y=angles[i][5];angles[i]['angle.start']=angles[i][0];angles[i]['angle.end']=angles[i][1];angles[i]['radius.start']=angles[i][2];angles[i]['radius.end']=angles[i][3];angles[i].index=typeof this.data[indexes[0]]==='number'?indexes[0]:indexes[1];angles[i].dataset=typeof this.data[indexes[0]]==='number'?indexes[1]:indexes[0],angles[i].sequentialIndex=angles[i][6];angles[i].tooltip=tooltip?tooltip:null;if(prop.variant==='non-equi-angular'){angles[i].dataset=0;angles[i].index=angles[i].sequentialIndex;}
return{object:this,x:angles[i][4],y:angles[i][5],angleStart:angles[i][0],angleEnd:angles[i][1],radiusStart:angles[i][2],radiusEnd:angles[i][3],dataset:angles[i].dataset,index:angles[i].index,sequentialIndex:angles[i][6],tooltip:typeof tooltip==='string'?tooltip:null};}}
return null;};this.getExploded=function(index,startAngle,endAngle,exploded)
{var explodedx,explodedy;if(typeof(exploded)=='object'&&typeof(exploded[index])=='number'){explodedx=Math.cos(((endAngle-startAngle)/2)+startAngle)*exploded[index];explodedy=Math.sin(((endAngle-startAngle)/2)+startAngle)*exploded[index];}else if(typeof(exploded)=='number'){explodedx=Math.cos(((endAngle-startAngle)/2)+startAngle)*exploded;explodedy=Math.sin(((endAngle-startAngle)/2)+startAngle)*exploded;}else{explodedx=0;explodedy=0;}
return[explodedx,explodedy];};this.allowTooltips=function()
{RGraph.preLoadTooltipImages(this);RGraph.installWindowMousedownTooltipListener(this);RGraph.installCanvasMousemoveTooltipListener(this);RGraph.installCanvasMouseupTooltipListener(this);};this.highlight=function(shape)
{if(prop.tooltipsHighlight){if(typeof prop.highlightStyle==='function'){(prop.highlightStyle)(shape);return;}
this.context.beginPath();this.context.strokeStyle=prop.highlightStroke;this.context.fillStyle=prop.highlightFill;this.context.arc(shape.x,shape.y,shape.radiusEnd,shape.angleStart,shape.angleEnd,false);if(shape.radiusStart>0){this.context.arc(shape.x,shape.y,shape.radiusStart,shape.angleEnd,shape.angleStart,true);}else{this.context.lineTo(shape.x,shape.y);}
this.context.closePath();this.context.stroke();this.context.fill();}};this.getObjectByXY=function(e)
{var mouseXY=RGraph.getMouseXY(e);var radius=RGraph.getHypLength(this.centerx,this.centery,mouseXY[0],mouseXY[1]);if(prop.variant.indexOf('3d')!==-1){radius/=-1;}
if(mouseXY[0]>(this.centerx-this.radius)&&mouseXY[0]<(this.centerx+this.radius)&&mouseXY[1]>(this.centery-this.radius)&&mouseXY[1]<(this.centery+this.radius)&&radius<=this.radius){return this;}};this.getRadius=function(value)
{if(value<0||value>this.max){return null;}
var r=(value/this.max)*this.radius;return r;};this.parseColors=function()
{if(this.original_colors.length===0){this.original_colors.colors=RGraph.arrayClone(prop.colors);this.original_colors.keyColors=RGraph.arrayClone(prop.keyColors);this.original_colors.highlightStroke=RGraph.arrayClone(prop.highlightStroke);this.original_colors.highlightFill=RGraph.arrayClone(prop.highlightFill);}
for(var i=0;i<prop.colors.length;++i){prop.colors[i]=this.parseSingleColorForGradient(prop.colors[i]);}
if(!RGraph.isNull(prop.keyColors)){for(var i=0;i<prop.keyColors.length;++i){prop.keyColors[i]=this.parseSingleColorForGradient(prop.keyColors[i]);}}
prop.highlightFill=this.parseSingleColorForGradient(prop.highlightFill);prop.highlightStroke=this.parseSingleColorForGradient(prop.highlightStroke);prop.segmentHighlightStroke=this.parseSingleColorForGradient(prop.segmentHighlightStroke);prop.segmentHighlightFill=this.parseSingleColorForGradient(prop.segmentHighlightFill);};this.reset=function()
{};this.parseSingleColorForGradient=function(color)
{if(!color||typeof(color)!='string'){return color;}
if(color.match(/^gradient\((.*)\)$/i)){if(color.match(/^gradient\(({.*})\)$/i)){return RGraph.parseJSONGradient({object:this,def:RegExp.$1});}
var parts=RegExp.$1.split(':');var grad=this.context.createRadialGradient(this.centerx,this.centery,0,this.centerx,this.centery,this.radius);var diff=1/(parts.length-1);grad.addColorStop(0,RGraph.trim(parts[0]));for(var j=1;j<parts.length;++j){grad.addColorStop(j*diff,RGraph.trim(parts[j]));}}
return grad?grad:color;};this.interactiveKeyHighlight=function(index)
{var segments=this.angles2;for(var i=0;i<this.angles2.length;i+=1){this.context.beginPath();this.context.lineWidth=2;this.context.fillStyle=prop.keyInteractiveHighlightChartFill;this.context.strokeStyle=prop.keyInteractiveHighlightChartStroke;this.context.arc(segments[i][index][4],segments[i][index][5],segments[i][index][2],segments[i][index][0],segments[i][index][1],false);this.context.arc(segments[i][index][4],segments[i][index][5],segments[i][index][3],segments[i][index][1],segments[i][index][0],true);this.context.closePath();this.context.fill();this.context.stroke();}
return;};this.on=function(type,func)
{if(type.substr(0,2)!=='on'){type='on'+type;}
if(typeof this[type]!=='function'){this[type]=func;}else{RGraph.addCustomEventListener(this,type,func);}
return this;};this.firstDrawFunc=function()
{};this.explode=function()
{var obj=this;var opt=arguments[0]||{};var callback=arguments[1]||function(){};var frames=opt.frames?opt.frames:30;var frame=0;var explodedMax=Math.max(this.canvas.width,this.canvas.height);var exploded=Number(this.get('exploded'));function iterator()
{exploded=(frame/frames)*explodedMax;obj.set('exploded',exploded);RGraph.clear(obj.canvas);RGraph.redrawCanvas(obj.canvas);if(frame++<frames){RGraph.Effects.updateCanvas(iterator);}else{callback(obj);}}
iterator();return this;};this.roundRobin=function()
{var obj=this;var opt=arguments[0]||{}
var frames=opt.frames||30;var frame=0;var original_margin=prop.margin;var margin=(360/this.data.length)/2;var callback=arguments[1]||function(){};this.set('margin',margin);this.set('animationRoundrobinFactor',0);function iterator()
{RGraph.clear(obj.canvas);RGraph.redrawCanvas(obj.canvas);if(frame++<frames){obj.set('animationRoundrobinFactor',frame/frames);obj.set('margin',(frame/frames)*original_margin);RGraph.Effects.updateCanvas(iterator);}else{obj.set('animationRoundrobinFactor',1);obj.set('margin',original_margin);callback(obj);}}
iterator();return this;};this.implode=function()
{var obj=this;var opt=arguments[0]||{};var callback=arguments[1]||function(){};var frames=opt.frames||30;var frame=0;var explodedMax=Math.max(this.canvas.width,this.canvas.height);var exploded=explodedMax;function iterator()
{exploded=explodedMax-((frame/frames)*explodedMax);obj.set('exploded',exploded);RGraph.clear(obj.canvas);RGraph.redrawCanvas(obj.canvas);if(frame++<frames){RGraph.Effects.updateCanvas(iterator);}else{RGraph.clear(obj.canvas);RGraph.redrawCanvas(obj.canvas);callback(obj);}}
iterator();return this;};this.grow=function()
{var obj=this;var opt=arguments[0]||{};var callback=arguments[1]||function(){};var frames=opt.frames||30;var frame=0;function iterator()
{obj.set('animationGrowMultiplier',frame/frames);RGraph.clear(obj.canvas);RGraph.redrawCanvas(obj.canvas);if(frame<frames){frame++;RGraph.Effects.updateCanvas(iterator);}else{callback(obj);}}
iterator();return this;};RGraph.register(this);RGraph.parseObjectStyleConfig(this,conf.options);};