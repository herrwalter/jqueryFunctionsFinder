/**
* This module will show you all the Jquery functions you have 
* used in on your page.
* @author Wouter Wessendorp 
*/
var ShowJQueryFunctions = function () {
    /**
     *@var jqf All jQuery functions 
     */
    this.jqf =  JSON.parse('[".add(",".addClass(",".after(",".ajaxComplete(",".ajaxError(",".ajaxSend(",".ajaxStart(",".ajaxStop(",".ajaxSuccess(",".andSelf(",".animate(",".append(",".appendTo(",".attr(",".before(",".bind(",".blur(",".change(",".children(",".clearQueue(",".click(",".clone(",".closest(",".contents(",".dblclick(",".delay(",".delegate(",".dequeue(",".detach(",".die(",".each(",".empty(",".end(",".eq(",".error(",".fadeIn(",".fadeOut(",".fadeTo(",".fadeToggle(",".filter(",".find(",".first(",".focus(",".focusin(",".focusout(",".get(",".has(",".hasClass(",".height(",".hide(",".hover(",".html(",".index(",".innerHeight(",".innerWidth(",".insertAfter(",".insertBefore(",".is(",".keydown(",".keypress(",".keyup(",".last(",".live(",".load(",".load(",".map(",".mousedown(",".mouseenter(",".mouseleave(",".mousemove(",".mouseout(",".mouseover(",".mouseup(",".next(",".nextAll(",".nextUntil(",".not(",".offset(",".offsetParent(",".one(",".outerHeight(",".outerWidth(",".parent(",".parents(",".parentsUntil(",".position(",".prepend(",".prependTo(",".prev(",".prevAll(",".prevUntil(",".pushStack(",".queue(",".ready(",".remove(",".removeAttr(",".removeClass(",".removeData(",".replaceAll(",".replaceWith(",".resize(",".scroll(",".scrollLeft(",".scrollTop(",".select(",".serialize(",".serializeArray(",".show(",".siblings(",".size(",".slice(",".slideDown(",".slideToggle(",".slideUp(",".stop(",".submit(",".text(",".toArray(",".toggle(",".toggle(",".toggleClass(",".trigger(",".triggerHandler(",".unbind(",".undelegate(",".unload(",".unwrap(",".val(",".width(",".wrap(",".wrapAll(",".wrapInner(",".done(",".fail(",".isRejected(",".isResolved(",".promise(",".reject(",".rejectWith(",".resolve(",".resolveWith(",".then(",".isDefaultPrevented(",".isImmediatePropagationStopped(",".isPropagationStopped(",".preventDefault(",".stopImmediatePropagation(",".stopPropagation(",".ajax(",".ajaxSetup(",".contains(",".data(",".dequeue(",".each(",".extend(",".get(",".getJSON(",".getScript(",".globalEval(",".grep(",".hasData(",".inArray(",".isArray(",".isEmptyObject(",".isFunction(",".isPlainObject(",".isWindow(",".isXMLDoc(",".makeArray(",".map(",".merge(",".noConflict(",".noop(",".now(",".param(",".parseXML(",".post(",".proxy(",".queue(",".removeData(",".sub(",".trim(",".type(",".unique(",".when(","jQuery("]');
    /**
     *@var scripts All scripts found in the dom 
     */
    this.scripts = document.querySelectorAll( 'script' );
    /**
     *@var countings Collection of all counted variables 
     */
    this.countings = { nrOfAjaxes : 0, nrOfCompleteAjaxes : 0 }
    /**
     *@var allJavascript = all the javascript found in the dom
     * Is filled after each call for a script 
     */
    this.allJavascript = "";
    /**
     *@var functionsFound = all jQuery functions found in the all the javascript
     */
    this.functionsFound = [];
    
    /**
     * Creates ajaxes for all the found script sources or gets the innerHTML of the script if no src attribute is given.
     * Ajax calls impements the scriptCompleteCallback
     */
    this.setAllJavascript = function () {
        //notice the - 1 after scripts .length. this is to prevent this functions from indexing this module.
        for( var index = 0; index < this.scripts.length -1; index++){
            if( this.scripts[index]['src'] !== ''  ){
                this.countings.nrOfAjaxes++;
                $.ajax({
                     url: this.scripts[index]['src'], 
                     complete : this.scriptCompleteCallback( this )
                });
            }
            else{
                this.allJavascript += this.scripts[index].innerHTML;
            }
        };
    }
    /**
     * Used callback for the ajax made for the javascript source.
     * If no cross scripting is allowed it will add blank to the allJavascript var
     * because responseText is empty on an error
     */
    this.scriptCompleteCallback = function ( context ) {
        return function ( ajaxReturnObject ) {
            context.countings.nrOfCompleteAjaxes++;
            context.allJavascript += ajaxReturnObject.responseText;
            if( context.countings.nrOfAjaxes == context.countings.nrOfCompleteAjaxes ){
                context.matchFunctions();
                context.showFunctions();
            }
        }
    }
    
    /**
     * Match all the jqueryfunctions and push them in the functionsFound array if 
     * one functions is used.
     * Leaves out duplicates 
     */
    this.matchFunctions = function () {
        for( index in this.jqf ){
            if( this.allJavascript.indexOf( this.jqf[index] ) !== -1 ){
                this.functionsFound.push( this.jqf[index] );
            }
        }
    }
    /**
     * Log all the found jQuery functions.
     * Adds a little style to the log so it can be found easily. 
     */
    this.showFunctions = function (){
        for( index in this.functionsFound ){
            console.log( '%c  JQUERY FUNCTION DETECTED: ', 'background:yellow; color:blue',  this.functionsFound[index] )
        }
    }
    
    /**
     * Inits this Module by setting the allJavascripts var.
     */
    this.init = function (){
        this.setAllJavascript();
    }
    
}()
