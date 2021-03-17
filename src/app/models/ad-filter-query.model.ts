export class AdFilterQuery {
  constructor(
    public offset = '0',
    public search = '',
    public subcategories = [],
    public price = []
  ) {}
}
