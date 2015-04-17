<% definitions.forEach(function(definition){ %>
# Method: ```<%= definition.name %>```
	<% if (definition.parms.length > 0) { %>
		Arguments:
		<% definition.parms.forEach(function(parm){ %>
		```<%= parm.name %>``` ```<%= parm.type %>```
		<% }) %>
	<% } %>

	<% if (definition.methods.length > 0) { %>
		Methods:
		<% definition.methods.forEach(function(method){ %>
		```<%= method.name %>```
			<% if (method.parms.length > 0) { %>
				Arguments:
				<% method.parms.forEach(function(parm){ %>
				```<%= parm.name %>``` ```<%= parm.type %>```
				<% }) %>
			<% } %>
		<% }) %>
	<% } %>
<% }) %>