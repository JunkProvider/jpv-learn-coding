<?php

/**
 * @version    SVN: $Id$
 * @author     Nico Englert <junkProvider@outlook.com>
 * @copyright  Nico Englert <junkProvider@outlook.com>
 */

namespace Application\Controller;

use JPV\Controller\ActionController;

/**
 * @author Nico Englert <junkProvider@outlook.com>
 */
class ApplicationController extends ActionController
{
	/**
	 * @return string
	 */
	public function run()
	{
		ob_start();
		include '/../views/page.phtml';
		return ob_get_clean();
	}
}
