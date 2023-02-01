import {inject} from '@loopback/core';
import {DefaultCrudRepository, Filter} from '@loopback/repository';
import {MemoryDataSource} from '../datasources';
import {Todo, TodoRelations} from '../models';

export class TodoRepository extends DefaultCrudRepository<
  Todo,
  typeof Todo.prototype.id,
  TodoRelations
> {
  constructor(
    @inject('datasources.memory') dataSource: MemoryDataSource,
  ) {
    super(Todo, dataSource);
  }

  find(filter: Filter<Todo> = {where: {isComplete: false}}, options = {}): Promise<(Todo & TodoRelations)[]> {
    filter = {...filter, where: {...{isComplete: false}, ...filter.where}};
    return super.find(filter, options);
  }
}
