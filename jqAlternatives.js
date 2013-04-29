//jQuery selector (ie8 only supports DOM level 2 selectors)
$ = document.querySelectorAll.bind( document );

//.hasClass()
Element.prototype.hasClass = function ( cName ){ 
  return this.className.split( ' ' ).indexOf( cName ) > -1 
}

//.addClass()
Element.prototype.addClass = function ( cName ){
  var classNames = this.className.split( ' ' );
  //if class doesn't allready exist
  if( classNames.indexOf( cName ) == -1 ){
    classNames.push( cName );
    this.className = classNames.join( ' ' );
  }
}

//.removeClass()
Element.prototype.removeClass = function ( cName ) {
  var classNames = this.className.split( ' ' );
  var index = classNames.indexOf( cName );
  //if classname exists.
  if( classNames.indexOf( cName ) > -1 ){
    classNames.splice( index, index );
    this.className = classNames.join( ' ' );
  }
}

//.find() after searching the dom with the querySelectorAll.
NodeList.prototype.find = function ( selector ){
  var nodeList = [];
	for( el in this ){
		if( this[el] instanceof Element ){
			var a = this[el].querySelectorAll( selector );
			if( a.length > 0 ){
				for( i in a ){
					nodeList.indexOf( a.item(i) ) > -1 ? true : nodeList.push( a.item(i) );
				}
			}
		}
	}
	return nodeList;
}

//.attr()
Use this[attribute] else .getAttribute() // ie5-7 returns object on style attribute

