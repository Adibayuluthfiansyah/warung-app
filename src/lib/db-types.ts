export interface Database {
  public: {
    Tables: {
      warung: {
        Row: Warung
        Insert: Omit<Warung, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Warung, 'id' | 'created_at'>>
      }
      menu: {
        Row: Menu
        Insert: Omit<Menu, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Menu, 'id' | 'created_at'>>
      }
      kategori_menu: {
        Row: KategoriMenu
        Insert: Omit<KategoriMenu, 'id' | 'created_at'>
        Update: Partial<Omit<KategoriMenu, 'id' | 'created_at'>>
      }
      transaksi: {
        Row: Transaksi
        Insert: Omit<Transaksi, 'id' | 'nomor_transaksi' | 'created_at'>
        Update: Partial<Omit<Transaksi, 'id' | 'nomor_transaksi' | 'created_at'>>
      }
      detail_transaksi: {
        Row: DetailTransaksi
        Insert: Omit<DetailTransaksi, 'id' | 'created_at'>
        Update: Partial<Omit<DetailTransaksi, 'id' | 'created_at'>>
      }
      warung_users: {
        Row: WarungUser
        Insert: Omit<WarungUser, 'id' | 'created_at'>
        Update: Partial<Omit<WarungUser, 'id' | 'created_at'>>
      }
    }
    Views: {
      omzet_harian: {
        Row: OmzetHarian
      }
      menu_terlaris: {
        Row: MenuTerlaris
      }
    }
    Functions: {
      generate_nomor_transaksi: {
        Args: { warung_uuid: string }
        Returns: string
      }
    }
  }
}

export interface Warung {
  id: string
  slug: string
  nama: string
  alamat?: string
  phone?: string
  email?: string
  pemilik_nama: string
  pemilik_phone?: string
  status: 'trial' | 'active' | 'expired' | 'suspended'
  trial_until?: string
  subscription_plan: 'basic' | 'premium'
  created_at: string
  updated_at: string
  settings: {
    currency: string
    timezone: string
  }
}

export interface Menu {
  id: string
  warung_id: string
  kategori_id?: string
  nama: string
  deskripsi?: string
  harga: number
  track_stock: boolean
  stock_qty: number
  stock_min: number
  tersedia: boolean
  is_recommended: boolean
  foto_url?: string
  created_at: string
  updated_at: string
  // Relations
  kategori_menu?: KategoriMenu
}

export interface KategoriMenu {
  id: string
  warung_id: string
  nama: string
  urutan: number
  created_at: string
}

export interface Transaksi {
  id: string
  warung_id: string
  nomor_transaksi: string
  subtotal: number
  pajak: number
  diskon: number
  total: number
  metode_bayar: string
  status_bayar: 'pending' | 'lunas' | 'cancel'
  customer_nama?: string
  customer_phone?: string
  kasir_nama?: string
  kasir_id?: string
  tanggal: string
  created_at: string
  // Relations
  detail_transaksi?: DetailTransaksi[]
  warung?: Warung
}

export interface DetailTransaksi {
  id: string
  transaksi_id: string
  menu_id: string
  menu_nama: string
  menu_harga: number
  qty: number
  subtotal: number
  catatan?: string
  created_at: string
  // Relations
  menu?: Menu
  transaksi?: Transaksi
}

export interface WarungUser {
  id: string
  warung_id: string
  user_id: string
  role: 'owner' | 'kasir' | 'viewer'
  created_at: string
  // Relations
  warung?: Warung
}

// Views interfaces
export interface OmzetHarian {
  warung_slug: string
  warung_nama: string
  tanggal: string
  total_transaksi: number
  total_omzet: number
  rata_rata_transaksi: number
}

export interface MenuTerlaris {
  warung_slug: string
  menu_nama: string
  total_terjual: number
  total_pendapatan: number
}