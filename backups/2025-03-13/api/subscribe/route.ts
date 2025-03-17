import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { z } from 'zod';

// Define schema for validation
const schema = z.object({
  email: z.string().email(),
  source: z.string().optional(),
  interests: z.array(z.string()).optional(),
});

type Subscriber = {
  email: string;
  timestamp: string;
  source?: string;
  interests?: string[];
};

// Path to the subscribers JSON file
const dataDir = path.join(process.cwd(), 'data');
const subscribersFile = path.join(dataDir, 'subscribers.json');

// Initialize data directory and file if they don't exist
function initializeDataStorage() {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  
  if (!fs.existsSync(subscribersFile)) {
    fs.writeFileSync(subscribersFile, JSON.stringify([]), 'utf8');
  }
}

// Read subscribers from file
function getSubscribers(): Subscriber[] {
  try {
    const data = fs.readFileSync(subscribersFile, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading subscribers file:', error);
    return [];
  }
}

// Write subscribers to file
function saveSubscribers(subscribers: Subscriber[]) {
  try {
    fs.writeFileSync(subscribersFile, JSON.stringify(subscribers, null, 2), 'utf8');
  } catch (error) {
    console.error('Error writing to subscribers file:', error);
    throw new Error('Failed to save subscriber');
  }
}

export async function POST(request: NextRequest) {
  try {
    // Initialize data storage
    initializeDataStorage();
    
    // Parse request body
    const body = await request.json();
    
    // Validate input
    const validationResult = schema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json({ 
        success: false, 
        message: 'Invalid email format' 
      }, { status: 400 });
    }
    
    const { email, source, interests } = validationResult.data;
    
    // Get existing subscribers
    const subscribers = getSubscribers();
    
    // Check if email already exists
    const existingSubscriber = subscribers.find(sub => sub.email.toLowerCase() === email.toLowerCase());
    if (existingSubscriber) {
      // Update existing subscriber if adding interests or changing source
      if ((interests && interests.length > 0) || source) {
        const updatedSubscribers = subscribers.map(sub => {
          if (sub.email.toLowerCase() === email.toLowerCase()) {
            return {
              ...sub,
              source: source || sub.source,
              interests: interests || sub.interests,
              // Don't update timestamp for existing subscribers
            };
          }
          return sub;
        });
        
        saveSubscribers(updatedSubscribers);
        
        return NextResponse.json({ 
          success: true, 
          message: 'Preferences updated successfully' 
        });
      }
      
      return NextResponse.json({ 
        success: false, 
        message: 'Email already subscribed' 
      }, { status: 409 });
    }
    
    // Add new subscriber
    const newSubscriber: Subscriber = {
      email,
      timestamp: new Date().toISOString(),
      source,
      interests,
    };
    
    subscribers.push(newSubscriber);
    saveSubscribers(subscribers);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Subscribed successfully' 
    });
    
  } catch (error) {
    console.error('Subscription error:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Server error, please try again later' 
    }, { status: 500 });
  }
}
