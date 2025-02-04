AddEventHandler('Characters:Shared:DependencyUpdate', RetrieveComponents)
function RetrieveComponents()
	Middleware = exports['quantum-base']:FetchComponent('Middleware')
	Database = exports['quantum-base']:FetchComponent('Database')
	Callbacks = exports['quantum-base']:FetchComponent('Callbacks')
	DataStore = exports['quantum-base']:FetchComponent('DataStore')
	Logger = exports['quantum-base']:FetchComponent('Logger')
	Database = exports['quantum-base']:FetchComponent('Database')
	Fetch = exports['quantum-base']:FetchComponent('Fetch')
	Logger = exports['quantum-base']:FetchComponent('Logger')
	Chat = exports['quantum-base']:FetchComponent('Chat')
	GlobalConfig = exports['quantum-base']:FetchComponent('Config')
	Routing = exports['quantum-base']:FetchComponent('Routing')
	Sequence = exports['quantum-base']:FetchComponent('Sequence')
	Reputation = exports['quantum-base']:FetchComponent('Reputation')
	Apartment = exports['quantum-base']:FetchComponent('Apartment')
	RegisterCommands()
	_spawnFuncs = {}
end

AddEventHandler('Core:Shared:Ready', function()
	exports['quantum-base']:RequestDependencies('Characters', {
		'Callbacks',
		'Database',
		'Middleware',
		'DataStore',
		'Logger',
		'Database',
		'Fetch',
		'Logger',
		'Chat',
		'Config',
		'Routing',
		'Sequence',
		'Reputation',
		'Apartment',
	}, function(error)
		if #error > 0 then return end -- Do something to handle if not all dependencies loaded
		RetrieveComponents()
		RegisterCallbacks()
		RegisterMiddleware()
		Startup()
	end)
end)