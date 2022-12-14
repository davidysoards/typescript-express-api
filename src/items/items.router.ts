/**
 * Required External Modules and Interfaces
 */

import express, { Request, Response } from 'express';
import * as ItemService from './items.service';
import { BaseItem, Item } from './item.interface';
import { ItemPermissions } from './item-permissions';

import { checkJwt } from '../middleware/authz.middleware';
import { checkPermissions } from '../middleware/permissions.middleware';

/**
 * Router Definition
 */

export const itemsRouter = express.Router();

/**
 * Controller Definitions
 */

// GET items
itemsRouter.get('/', async (req: Request, res: Response) => {
  try {
    const items: Item[] = await ItemService.findAll();
    res.status(200).send(items);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});

// GET items/:id
itemsRouter.get('/:id', async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);
  try {
    const item: Item = await ItemService.find(id);
    if (item) {
      return res.status(200).send(item);
    }
    res.status(404).send('Item not found');
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});

// Mount authorization middleware
itemsRouter.use(checkJwt);

// POST items
itemsRouter.post('/', checkPermissions([ItemPermissions.CreateItems]), async (req: Request, res: Response) => {
  try {
    const item: BaseItem = req.body;
    const newItem = await ItemService.create(item);
    res.status(201).json(newItem);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});

// PUT items/:id
itemsRouter.put('/:id', checkPermissions([ItemPermissions.UpdateItems]), async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);
  try {
    const itemUpdate: Item = req.body;
    const existingItem: Item = await ItemService.find(id);
    if (existingItem) {
      const updatedItem = await ItemService.update(id, itemUpdate);
      return res.status(200).json(updatedItem);
    }
    const newItem = await ItemService.create(itemUpdate);
    res.status(201).json(newItem);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});

// DELETE items/:id

itemsRouter.delete('/:id', checkPermissions([ItemPermissions.DeleteItems]), async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id, 10);
    await ItemService.remove(id);
    res.sendStatus(204);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});
