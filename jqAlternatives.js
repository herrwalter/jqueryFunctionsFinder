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
