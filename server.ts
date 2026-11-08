import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { dbService } from './src/server/db.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

// Initialize MongoDB service
await dbService.initialize();

// Database Status / Health endpoint
app.get('/api/health', (req: Request, res: Response) => {
  const status = dbService.getStatus();
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    database: status
  });
});

// Retreats Endpoints
app.get('/api/retreats', async (req: Request, res: Response) => {
  try {
    const { style, region, guests, query } = req.query;
    const retreats = await dbService.getRetreats({
      style: typeof style === 'string' ? style : undefined,
      region: typeof region === 'string' ? region : undefined,
      guests: typeof guests === 'string' && !isNaN(Number(guests)) ? Number(guests) : undefined,
      query: typeof query === 'string' ? query : undefined
    });
    res.json({ data: retreats });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to retrieve retreats', details: err?.message });
  }
});

app.get('/api/retreats/:idOrSlug', async (req: Request, res: Response) => {
  try {
    const { idOrSlug } = req.params;
    const retreat = await dbService.getRetreatBySlugOrId(idOrSlug);
    if (!retreat) {
      return res.status(404).json({ error: 'Retreat not found' });
    }
    res.json({ data: retreat });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to retrieve retreat', details: err?.message });
  }
});

// Reservations Endpoints
app.get('/api/reservations', async (req: Request, res: Response) => {
  try {
    const reservations = await dbService.getReservations();
    res.json({ data: reservations });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to retrieve reservations', details: err?.message });
  }
});

app.get('/api/reservations/:idOrCode', async (req: Request, res: Response) => {
  try {
    const { idOrCode } = req.params;
    const reservation = await dbService.getReservationByIdOrCode(idOrCode);
    if (!reservation) {
      return res.status(404).json({ error: 'Reservation not found' });
    }
    res.json({ data: reservation });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to retrieve reservation', details: err?.message });
  }
});

app.post('/api/reservations', async (req: Request, res: Response) => {
  try {
    const {
      retreatId,
      retreatName,
      retreatSubtitle,
      retreatImage,
      guestName,
      guestEmail,
      guestPhone,
      checkIn,
      checkOut,
      nights,
      guestsCount,
      pricePerNight,
      conciergeAddons,
      baseTotal,
      serviceTariff,
      conservationPledge,
      totalPrice,
      specialRequests
    } = req.body;

    if (!retreatId || !guestName || !guestEmail || !checkIn || !checkOut) {
      return res.status(400).json({ error: 'Missing required reservation fields' });
    }

    const created = await dbService.createReservation({
      retreatId,
      retreatName: retreatName || 'Sanctuary Residence',
      retreatSubtitle: retreatSubtitle || '',
      retreatImage: retreatImage || '',
      guestName,
      guestEmail,
      guestPhone: guestPhone || '',
      checkIn,
      checkOut,
      nights: Number(nights) || 1,
      guestsCount: Number(guestsCount) || 1,
      pricePerNight: Number(pricePerNight) || 0,
      conciergeAddons: Array.isArray(conciergeAddons) ? conciergeAddons : [],
      baseTotal: Number(baseTotal) || 0,
      serviceTariff: Number(serviceTariff) || 0,
      conservationPledge: Number(conservationPledge) || 0,
      totalPrice: Number(totalPrice) || 0,
      specialRequests: specialRequests || ''
    });

    res.status(201).json({ message: 'Reservation confirmed successfully', data: created });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to create reservation', details: err?.message });
  }
});

app.delete('/api/reservations/:idOrCode', async (req: Request, res: Response) => {
  try {
    const { idOrCode } = req.params;
    const success = await dbService.cancelReservation(idOrCode);
    if (!success) {
      return res.status(404).json({ error: 'Reservation not found or could not be cancelled' });
    }
    res.json({ message: 'Reservation cancelled successfully' });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to cancel reservation', details: err?.message });
  }
});

// Inquiries Endpoints
app.post('/api/inquiries', async (req: Request, res: Response) => {
  try {
    const { name, email, phone, dates, preferredRetreat, guestCount, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email and inquiry message are required' });
    }

    const created = await dbService.createInquiry({
      name,
      email,
      phone,
      dates,
      preferredRetreat,
      guestCount: guestCount ? Number(guestCount) : undefined,
      message
    });

    res.status(201).json({ message: 'Curatorial inquiry received', data: created });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to submit inquiry', details: err?.message });
  }
});

app.get('/api/inquiries', async (req: Request, res: Response) => {
  try {
    const inquiries = await dbService.getInquiries();
    res.json({ data: inquiries });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to retrieve inquiries', details: err?.message });
  }
});

// Mount Vite or static server
const isProduction = process.env.NODE_ENV === 'production';

if (!isProduction) {
  const { createServer: createViteServer } = await import('vite');
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa'
  });
  app.use(vite.middlewares);
} else {
  const distPath = path.resolve(__dirname, 'dist');
  app.use(express.static(distPath));
  app.get('*', (req: Request, res: Response) => {
    res.sendFile(path.resolve(distPath, 'index.html'));
  });
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Sanctuary Editorial Residences running on http://0.0.0.0:${PORT}`);
});
