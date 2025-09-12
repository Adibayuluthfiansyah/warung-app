import  supabase  from './db'
import type { Warung, Menu, KategoriMenu, Transaksi, DetailTransaksi } from './db-types'

export const queries = {
  // Warung queries
  async getWarungBySlug(slug: string) {
    const { data, error } = await supabase
      .from('warung')
      .select('*')
      .eq('slug', slug)
      .single()
    
    return { data, error }
  },

  async getAllWarungByUser(userId: string) {
    const { data, error } = await supabase
      .from('warung_users')
      .select(`
        role,
        warung:warung_id (
          id,
          slug,
          nama,
          status,
          alamat,
          phone,
          pemilik_nama
        )
      `)
      .eq('user_id', userId)
    
    return { data, error }
  },

  // Menu queries
  async getMenuByWarung(warungId: string) {
    const { data, error } = await supabase
      .from('menu')
      .select(`
        *,
        kategori_menu (
          id,
          nama,
          urutan
        )
      `)
      .eq('warung_id', warungId)
      .eq('tersedia', true)
      .order('nama')
    
    return { data, error }
  },

  async getAllMenuByWarung(warungId: string) {
    const { data, error } = await supabase
      .from('menu')
      .select(`
        *,
        kategori_menu (
          id,
          nama,
          urutan
        )
      `)
      .eq('warung_id', warungId)
      .order('nama')
    
    return { data, error }
  },

  // Kategori queries
  async getKategoriByWarung(warungId: string) {
    const { data, error } = await supabase
      .from('kategori_menu')
      .select('*')
      .eq('warung_id', warungId)
      .order('urutan')
    
    return { data, error }
  },

  async createKategori(kategori: Omit<KategoriMenu, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('kategori_menu')
      .insert(kategori)
      .select()
      .single()
    
    return { data, error }
  },

  // Menu CRUD
  async createMenu(menu: Omit<Menu, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('menu')
      .insert(menu)
      .select()
      .single()
    
    return { data, error }
  },

  async updateMenu(id: string, updates: Partial<Omit<Menu, 'id' | 'created_at'>>) {
    const { data, error } = await supabase
      .from('menu')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    return { data, error }
  },

  async deleteMenu(id: string) {
    const { error } = await supabase
      .from('menu')
      .delete()
      .eq('id', id)
    
    return { error }
  },

  // Transaksi queries
  async getTransaksiHariIni(warungId: string) {
    const today = new Date().toISOString().split('T')[0]
    
    const { data, error } = await supabase
      .from('transaksi')
      .select(`
        *,
        detail_transaksi (
          *,
          menu (
            nama,
            harga
          )
        )
      `)
      .eq('warung_id', warungId)
      .gte('tanggal', today)
      .order('created_at', { ascending: false })
    
    return { data, error }
  },

  async getTransaksiByDateRange(warungId: string, startDate: string, endDate: string) {
    const { data, error } = await supabase
      .from('transaksi')
      .select(`
        *,
        detail_transaksi (
          *,
          menu (
            nama,
            harga
          )
        )
      `)
      .eq('warung_id', warungId)
      .gte('tanggal', startDate)
      .lte('tanggal', endDate)
      .order('created_at', { ascending: false })
    
    return { data, error }
  },

  async getTransaksiById(id: string) {
    const { data, error } = await supabase
      .from('transaksi')
      .select(`
        *,
        detail_transaksi (
          *,
          menu (
            nama,
            harga
          )
        ),
        warung (
          nama,
          alamat,
          phone
        )
      `)
      .eq('id', id)
      .single()
    
    return { data, error }
  },

  // Create transaksi
  async createTransaksi(transaksi: Omit<Transaksi, 'id' | 'nomor_transaksi' | 'created_at'>) {
    const { data, error } = await supabase
      .from('transaksi')
      .insert(transaksi)
      .select()
      .single()
    
    return { data, error }
  },

  // Add detail transaksi
  async addDetailTransaksi(details: Omit<DetailTransaksi, 'id' | 'created_at'>[]) {
    const { data, error } = await supabase
      .from('detail_transaksi')
      .insert(details)
      .select()
    
    return { data, error }
  },

  // Update transaksi status
  async updateTransaksiStatus(id: string, status: 'pending' | 'lunas' | 'cancel') {
    const { data, error } = await supabase
      .from('transaksi')
      .update({ status_bayar: status })
      .eq('id', id)
      .select()
      .single()
    
    return { data, error }
  },

  // Analytics queries
  async getOmzetHarian(warungSlug: string, days: number = 30) {
    const { data, error } = await supabase
      .from('omzet_harian')
      .select('*')
      .eq('warung_slug', warungSlug)
      .gte('tanggal', new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString().split('T')[0])
      .order('tanggal', { ascending: false })
    
    return { data, error }
  },

  async getMenuTerlaris(warungSlug: string, limit: number = 10) {
    const { data, error } = await supabase
      .from('menu_terlaris')
      .select('*')
      .eq('warung_slug', warungSlug)
      .order('total_terjual', { ascending: false })
      .limit(limit)
    
    return { data, error }
  }
}