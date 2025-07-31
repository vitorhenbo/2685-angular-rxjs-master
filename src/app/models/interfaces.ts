export interface Livro {
  title?: string;
  authors?: string[];
  publisher?: string;
  publishedDate?: string;
  description?: string;
  previewLink?: string;
  thumbnail?: ImageLinks;
}

export interface GoogleBooksResponse {
  kind: string;
  items: BookItem[];
  totalItems: number;
}

export interface BookItem {
  kind: string;
  id: string;
  etag: string;
  selfLink: string;
  volumeInfo: VolumeInfo;
  saleInfo: SaleInfo;
  accessInfo: AccessInfo;
}

export interface VolumeInfo {
  title: string;
  authors: string[];
  publisher: string;
  publishedDate: string;
  description: string;
  industryIdentifiers: IndustryIdentifier[];
  pageCount: number;
  dimensions: Dimensions;
  printType: string;
  mainCategory: string;
  categories: string[];
  averageRating: number;
  ratingsCount: number;
  contentVersion: string;
  imageLinks: ImageLinks;
  language: string;
  infoLink: string;
  canonicalVolumeLink: string;
}

export interface IndustryIdentifier {
  type: string;
  identifier: string;
}

export interface Dimensions {
  height: string;
  width: string;
  thickness: string;
}

export interface ImageLinks {
  smallThumbnail: string;
  thumbnail: string;
  small: string;
  medium: string;
  large: string;
  extraLarge: string;
}

export interface SaleInfo {
  country: string;
  saleability: string;
  isEbook: boolean;
  listPrice: Price;
  retailPrice: Price;
  buyLink: string;
}

export interface Price {
  amount: number;
  currencyCode: string;
}

export interface AccessInfo {
  country: string;
  viewability: string;
  embeddable: boolean;
  publicDomain: boolean;
  textToSpeechPermission: string;
  epub: EpubInfo;
  pdf: PdfInfo;
  accessViewStatus: string;
}

export interface EpubInfo {
  isAvailable: boolean;
  acsTokenLink?: string;
}

export interface PdfInfo {
  isAvailable: boolean;
  acsTokenLink?: string;
}

export interface Item {
  volumeInfo: VolumeInfo;
}

export interface LivrosResultado {
  items: Item[];
  totalItems: number;
}
