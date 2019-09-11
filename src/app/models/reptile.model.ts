export class Reptile {
  photo: string
  note: string
  destination: string
  date_end: string
  death: string
  supporting_end: string
  constructor(
    public name: string,
    public vernacular: string,
    public species: string,
    public birthday: string,
    public gender: string,
    public origin: string,
    public date_start: string,
    public supporting_start: string
  ) { }
}
