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
class MenuItem
{
	/**
	 * @var string
	 */
	private $id;

	/**
	 * @var string
	 */
	private $text;

	/**
	 * @var boolean
	 */
	private $current = false;

	/**
	 * @var MenuItem[]
	 */
	private $children;

	/**
	 * @param string     $id
	 * @param string     $text
	 * @param MenuItem[] $children
	 */
	public function __construct($id, $text, array $children = [])
	{
		$this->id = $id;
		$this->text = $text;

		foreach ($children as $child)
		{
			$this->children[$child->getId()] = $child;
		}
	}

	/**
	 * @return string
	 */
	public function getId()
	{
		return $this->id;
	}

	/**
	 * @return string
	 */
	public function getText()
	{
		return $this->text;
	}

	/**
	 * @return boolean
	 */
	public function hasChildren()
	{
		return count($this->children) !== 0;
	}

	/**
	 * @return MenuItem[]
	 */
	public function getChildren()
	{
		return $this->children;
	}

	/**
	 * Gets whether the menu is the current (selected/visisted) menu item.
	 *
	 * @return boolean
	 */
	public function isCurrent()
	{
		return $this->current;
	}

	/**
	 * Sets whether the menu item is the current (selected/visisted) menu item.
	 *
	 * @param boolean $current
	 */
	public function setCurrent($current)
	{
		$this->current = $current;
	}

	/**
	 * Gets the descendant with the given id.
	 *
	 * @param string $id
	 *
	 * @return MenuItem|null
	 */
	public function getDescendant($id)
	{
		if (isset ($this->children[$id]))
		{
			return $this->children[$id];
		}

		foreach ($this->children as $child)
		{
			$descendant = $child->getDescendant($id);
			if ($descendant !== null)
			{
				return $descendant;
			}
		}

		return null;
	}
}
