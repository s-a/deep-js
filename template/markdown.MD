<% deep.definitions.forEach(function(definition){ %>
## ```<%= definition.name -%>``` <% if (definition.extends) { %><%= deep.lineSlurp %>
		extends [<%= definition.extends.name %>](<%= deep.outputFilename %>#<%= definition.extends.name_lower -%>) <%= deep.lineSlurp %>
	<% } %><% if (definition.construct) {  %><%= deep.lineSlurp %>Constructor [<%= definition.construct.name %>](<%= deep.outputFilename %>#<%= definition.construct.name_lower -%>)
	<% } %>

	<% if (definition.comments) { %>
		> <%= definition.comments %>
	<% } %>

	<% if (definition.parms.length > 0) { %>
		>> ***Arguments***:
		<% definition.parms.forEach(function(parm){ %>
			>> ***<%= parm.name %>*** [```<%= parm.type %>```](<%= parm.api %>)
		<% }) %>
	<% } %>  


	<% if (definition.methods.length > 0) { %>
		<% definition.methods.forEach(function(method){ %>
			### ```<%= definition.name %>.<%= method.name %>()```
			<% if (method.parms.length > 0) { %>
				>> ***Arguments***:
				<% method.parms.forEach(function(parm){ %>
					>> ***<%= parm.name %>*** [```<%= parm.type %>```](<%= parm.api %>)
				<% }) %>
			<% } %>
		<% }) %>
	<% } %>
<% }) %>