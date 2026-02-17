import { NextResponse } from 'next/server';
import { executeQuery } from '@/lib/db';

interface SpecialEventRow {
  id: string;
  name: string;
  isActive: boolean;
  eventDate: Date;
  startDate: Date;
  endDate: Date;
  headerButton_show: boolean;
  headerButton_text: string | null;
  headerButton_url: string | null;
  banner_title: string | null;
  banner_description: string | null;
  banner_ctaText: string | null;
  popup_enabled: boolean;
  popup_discount: number | null;
  popup_code: string | null;
  popup_minAmount: number | null;
  urgencyTimer_show: boolean;
  urgencyTimer_deadline: Date | null;
  urgencyTimer_hoursLeft: number | null;
  limitedSlots_show: boolean;
  limitedSlots_slots: number | null;
  limitedSlots_message: string | null;
  createdAt: Date;
  updatedAt: Date;
}

// GET - Obtener eventos (todos o el activo)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const activeOnly = searchParams.get('activeOnly') === 'true';
    
    let query = 'SELECT * FROM special_events';
    
    if (activeOnly) {
      query += ' WHERE isActive = TRUE LIMIT 1';
    } else {
      query += ' ORDER BY eventDate DESC';
    }
    
    const events = await executeQuery<SpecialEventRow>(query);
    
    return NextResponse.json(activeOnly && events.length > 0 ? events[0] : events);
  } catch (error) {
    
    return NextResponse.json({ error: 'Error al cargar eventos especiales' }, { status: 500 });
  }
}

// POST - Crear nuevo evento
export async function POST(request: Request) {
  try {
    const event = await request.json();
    
    const result = await executeQuery(
      `INSERT INTO special_events (
        id, name, isActive, eventDate, startDate, endDate,
        headerButton_show, headerButton_text, headerButton_url,
        banner_title, banner_description, banner_ctaText,
        popup_enabled, popup_discount, popup_code, popup_minAmount,
        urgencyTimer_show, urgencyTimer_deadline, urgencyTimer_hoursLeft,
        limitedSlots_show, limitedSlots_slots, limitedSlots_message
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        event.id || `event-${Date.now()}`,
        event.name,
        event.isActive || false,
        event.eventDate,
        event.startDate,
        event.endDate,
        event.headerButton_show !== false,
        event.headerButton_text || null,
        event.headerButton_url || null,
        event.banner_title || null,
        event.banner_description || null,
        event.banner_ctaText || null,
        event.popup_enabled !== false,
        event.popup_discount || null,
        event.popup_code || null,
        event.popup_minAmount || null,
        event.urgencyTimer_show !== false,
        event.urgencyTimer_deadline || null,
        event.urgencyTimer_hoursLeft || null,
        event.limitedSlots_show !== false,
        event.limitedSlots_slots || null,
        event.limitedSlots_message || null
      ]
    );
    
    return NextResponse.json({ success: true, result });
  } catch (error) {
    
    return NextResponse.json({ error: 'Error al crear evento especial' }, { status: 500 });
  }
}

// PUT - Actualizar evento
export async function PUT(request: Request) {
  try {
    const event = await request.json();
    
    if (!event.id) {
      return NextResponse.json({ error: 'ID requerido' }, { status: 400 });
    }
    
    const result = await executeQuery(
      `UPDATE special_events SET
        name = ?, isActive = ?, eventDate = ?, startDate = ?, endDate = ?,
        headerButton_show = ?, headerButton_text = ?, headerButton_url = ?,
        banner_title = ?, banner_description = ?, banner_ctaText = ?,
        popup_enabled = ?, popup_discount = ?, popup_code = ?, popup_minAmount = ?,
        urgencyTimer_show = ?, urgencyTimer_deadline = ?, urgencyTimer_hoursLeft = ?,
        limitedSlots_show = ?, limitedSlots_slots = ?, limitedSlots_message = ?
       WHERE id = ?`,
      [
        event.name,
        event.isActive,
        event.eventDate,
        event.startDate,
        event.endDate,
        event.headerButton_show,
        event.headerButton_text || null,
        event.headerButton_url || null,
        event.banner_title || null,
        event.banner_description || null,
        event.banner_ctaText || null,
        event.popup_enabled,
        event.popup_discount || null,
        event.popup_code || null,
        event.popup_minAmount || null,
        event.urgencyTimer_show,
        event.urgencyTimer_deadline || null,
        event.urgencyTimer_hoursLeft || null,
        event.limitedSlots_show,
        event.limitedSlots_slots || null,
        event.limitedSlots_message || null,
        event.id
      ]
    );
    
    return NextResponse.json({ success: true, result });
  } catch (error) {
    
    return NextResponse.json({ error: 'Error al actualizar evento especial' }, { status: 500 });
  }
}

// DELETE - Eliminar evento
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'ID requerido' }, { status: 400 });
    }
    
    const result = await executeQuery(
      'DELETE FROM special_events WHERE id = ?',
      [id]
    );
    
    return NextResponse.json({ success: true, result });
  } catch (error) {
    
    return NextResponse.json({ error: 'Error al eliminar evento especial' }, { status: 500 });
  }
}
