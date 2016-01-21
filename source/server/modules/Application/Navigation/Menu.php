<?php

/**
 * @version    SVN: $Id$
 * @author     Nico Englert <junkProvider@outlook.com>
 * @copyright  Nico Englert <junkProvider@outlook.com>
 */

namespace Application\Navigation;

/**
 * @author Nico Englert <junkProvider@outlook.com>
 */
class Menu
{
	/**
	 * @var MenuItem[]
	 */
	private $items;

	/**
	 * @param MenuItem[] $items
	 */
	public function __construct(array $items)
	{
		foreach ($items as $item)
		{
			$this->items[$item->getId()] = $item;
		}
	}

	/**
	 * @return MenuItem[]
	 */
	public function getItems()
	{
		return $this->items;
	}

	/**
	 * Gets the menu item with the given id.
	 *
	 * @param string $id
	 *
	 * @return MenuItem|null
	 */
	public function getItem($id)
	{
		if (isset ($this->items[$id]))
		{
			return $this->items[$id];
		}

		foreach ($this->items as $item)
		{
			$foundItem = $item->getDescendant($id);
			if ($foundItem !== null)
			{
				return $foundItem;
			}
		}

		return null;
	}
}
