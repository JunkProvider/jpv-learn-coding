<?php

/**
 * @version    SVN: $Id$
 * @author     Nico Englert <junkProvider@outlook.com>
 * @copyright  Nico Englert <junkProvider@outlook.com>
 */

namespace Application\Controller;

use JPV\Controller\ActionController;
use Application\Navigation\Menu;
use Application\Navigation\MenuItem;

/**
 * @author Nico Englert <junkProvider@outlook.com>
 */
class ApplicationController extends ActionController
{
	/**
	 * @return string
	 */
	public function run($view = null)
	{
		$menuItemId = isset ($_GET['view']) ? $_GET['view'] : 'variables';

		$menu = new Menu([
			new MenuItem(
				'introduction',
				'Einführung',
				[
					new MenuItem('variables', 'Variablen'),
					new MenuItem('distinctions', 'Fallunterscheidungen'),
					new MenuItem('loops', 'Schleifen'),
				]
			)
		]);
		$menu->getItem($menuItemId)->setCurrent(true);

		return $this->renderViewInLayout($menuItemId . '.phtml', $menu);
	}

	private function renderViewInLayout($view, $menu)
	{
		$renderer = $this->getViewRenderer();

		$view = implode(DIRECTORY_SEPARATOR, [ 'source', 'server', 'modules', 'Application', 'views', $view ]);
		$viewHtml = $renderer->render($view);
		$layout = implode(DIRECTORY_SEPARATOR, [ 'source', 'server', 'modules', 'Application', 'views', 'layout.phtml' ]);
		$pageHtml = $renderer->render($layout, [ 'content' => $viewHtml, 'menu' => $menu ]);
		return $pageHtml;
	}

	/**
	 * @return \JPV\View\Renderer
	 */
	private function getViewRenderer()
	{
		return $this->getServiceProvider()->provide(\JPV\View\Renderer::class);
	}
}
