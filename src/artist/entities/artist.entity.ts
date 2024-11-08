export class Artist {
  id: string; // uuid v4
  name: string;
  grammy: boolean;

  constructor({
    id,
    name,
    grammy,
  }: {
    id: string;
    name: string;
    grammy: boolean;
  }) {
    this.id = id;
    this.name = name;
    this.grammy = grammy;
  }
}
