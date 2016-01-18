<?php

return
[
	'application' => [
		'defaultController' => 'Application\\Controller\\ApplicationController',
		'defaultAction' => 'run',
	],
	'factories' => [
		//\mysqli::class => Application\Repository\MySqliFactory::class,
	],
	/*'mysqli' => [
		'host' => 'localhost',
		'user' => 'root',
		'password' => 'qwerdenker',
		'database' => 'test',
		'port' => 3306,
	],*/
];
