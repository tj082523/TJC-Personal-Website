import { Injectable } from '@nestjs/common';
import { supabase } from '../supabase.client';

@Injectable()
export class GuestbookService {

  async create(name: string, message: string) {
    const { data, error } = await supabase
      .from('guestbook')
      .insert([{ name, message }]);

    if (error) throw error;

    return data;
  }

  async findAll() {
    const { data, error } = await supabase
      .from('guestbook')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return data;
  }
}