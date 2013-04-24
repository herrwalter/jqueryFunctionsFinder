/**
 * This module will show you all the Jquery functions you have 
 * used in on this page.
 * @author Wouter Wessendorp 
 */
var ShowJQueryFunctions = function ( exclusions ) {
    /**
     * @var jqf All jQuery functions 
     * @type Object
     */
    this.jqf =  JSON.parse('[".add(",".addClass(",".after(",".ajaxComplete(",".ajaxError(",".ajaxSend(",".ajaxStart(",".ajaxStop(",".ajaxSuccess(",".andSelf(",".animate(",".append(",".appendTo(",".attr(",".before(",".bind(",".blur(",".change(",".children(",".clearQueue(",".click(",".clone(",".closest(",".contents(",".dblclick(",".delay(",".delegate(",".dequeue(",".detach(",".die(",".each(",".empty(",".end(",".eq(",".error(",".fadeIn(",".fadeOut(",".fadeTo(",".fadeToggle(",".filter(",".find(",".first(",".focus(",".focusin(",".focusout(",".get(",".has(",".hasClass(",".height(",".hide(",".hover(",".html(",".index(",".innerHeight(",".innerWidth(",".insertAfter(",".insertBefore(",".is(",".keydown(",".keypress(",".keyup(",".last(",".live(",".load(",".load(",".map(",".mousedown(",".mouseenter(",".mouseleave(",".mousemove(",".mouseout(",".mouseover(",".mouseup(",".next(",".nextAll(",".nextUntil(",".not(",".offset(",".offsetParent(",".one(",".outerHeight(",".outerWidth(",".parent(",".parents(",".parentsUntil(",".position(",".prepend(",".prependTo(",".prev(",".prevAll(",".prevUntil(",".pushStack(",".queue(",".ready(",".remove(",".removeAttr(",".removeClass(",".removeData(",".replaceAll(",".replaceWith(",".resize(",".scroll(",".scrollLeft(",".scrollTop(",".select(",".serialize(",".serializeArray(",".show(",".siblings(",".size(",".slice(",".slideDown(",".slideToggle(",".slideUp(",".stop(",".submit(",".text(",".toArray(",".toggle(",".toggle(",".toggleClass(",".trigger(",".triggerHandler(",".unbind(",".undelegate(",".unload(",".unwrap(",".val(",".width(",".wrap(",".wrapAll(",".wrapInner(",".done(",".fail(",".isRejected(",".isResolved(",".promise(",".reject(",".rejectWith(",".resolve(",".resolveWith(",".then(",".isDefaultPrevented(",".isImmediatePropagationStopped(",".isPropagationStopped(",".preventDefault(",".stopImmediatePropagation(",".stopPropagation(",".ajax(",".ajaxSetup(",".contains(",".data(",".dequeue(",".each(",".extend(",".get(",".getJSON(",".getScript(",".globalEval(",".grep(",".hasData(",".inArray(",".isArray(",".isEmptyObject(",".isFunction(",".isPlainObject(",".isWindow(",".isXMLDoc(",".makeArray(",".map(",".merge(",".noConflict(",".noop(",".now(",".param(",".parseXML(",".post(",".proxy(",".queue(",".removeData(",".sub(",".trim(",".type(",".unique(",".when(","jQuery("]');
    /**
     * @var scripts  All scripts found in the dom 
     * @type NodeList
     */
    this.scripts = document.querySelectorAll( 'script' );
    /**
     * @var countings = Collection of all counted variables 
     * @type Object
     */
    this.countings = { nrOfAjaxes : 0, nrOfCompleteAjaxes : 0 }
    /**
     * @var allJavascript = all the javascript found in the dom
     *      Is filled after each call for a script 
     * @type String
     */
    this.allJavascript = "";
    /**
     * @var functionsFound =  all jQuery functions found in the all the javascript
     * @type Array
     */
    this.functionsFound = [];
    
    /**
     * @var excludes = Array exclusions of filenames that should not be requested or serached. 
     * @type Array
     */
    this.excludes = []
    
    /**
     * Creates ajaxes for all the found script sources or gets the innerHTML of the script if no src attribute is given.
     * Ajax calls impements the scriptCompleteCallback
     */
    this.setAllJavascript = function () {
        //notice the - 1 after scripts .length. this is to prevent this functions from indexing this module.
        for( var index = 0; index < this.scripts.length -1; index++){
            var source = this.scripts[index]['src'];
            if( source !== '' && !this.isSourceExcluded( source )  ){
                this.countings.nrOfAjaxes++;
                $.ajax({
                     url: this.scripts[index]['src'], 
                     complete : this.scriptCompleteCallback( this )
                });
            }
            else if( source == '' ){
                this.allJavascript += this.scripts[index].innerHTML;
            }
        };
    }
    /**
     * Returns true if the source should be excluded
     * @return Boolean 
     */
    this.isSourceExcluded = function ( source ){
        for( index in this.excludes ){
            if( source.indexOf( this.excludes[index] ) !== -1 ){
                return true;
            }
        }
        return false;
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
    this.init = function ( excludes ){
        this.setExclusions( excludes );
        this.setAllJavascript();
    }
    /** 
     * Sets this excludes var with an Array 
     * @param excludes = Array with file names to be excluded.
     */
    this.setExclusions = function ( excludes ) {
        if( excludes instanceof Array ){
            this.excludes = excludes;
            return
        }
        throw Error( 'exclusions should be an Array' );
    }
    
}
