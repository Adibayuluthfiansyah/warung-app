'use client'
import React, { useEffect, useState } from "react"
import type { Menu } from "@/lib/db-types";
import supabase from "@/lib/db";


export default function Home() {
  const [menu, setMenus] = useState<Menu[]>([]);
  
  useEffect(() => {
    const fetchMenus = async () => {
      const {data, error} = await supabase.from('menu').select('*');
      if (error) console.log('error:', error)
        else setMenus(data);
    };
  fetchMenus();
  },[supabase]);
  return (
    <div className="text-center">
      <h1 className="text-bold text-5xl">This Main Page</h1>
      <div className="pt-5">
      </div>
    </div>
  )
}