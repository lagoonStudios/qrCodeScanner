export interface Register {
  name: string;
  email: string;
  id: string;
  donative: boolean;
  donative_type:
    | 'instrumento'
    | 'ropa'
    | 'juguete'
    | 'comida'
    | 'medicina'
    | 'otro';
  attendance: boolean;
}
