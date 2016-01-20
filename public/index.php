<?php

chdir(dirname(__DIR__));

$run = implode(DIRECTORY_SEPARATOR, [ '', '..', 'source', 'server', 'run.php' ]);
include $run;