import { Router } from 'express';
import fs from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { supabase, supabaseBucket } from '../config/supabase.js';

const router = Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Data directory & files path
const DATA_DIR = join(__dirname, '..', 'data');
const PROJECTS_FILE = join(DATA_DIR, 'projects.json');
const TEAM_FILE = join(DATA_DIR, 'team.json');

// Ensure data folder exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initial default projects setup
const defaultProjects = [
  { id: 'proj-1', title: 'Modern Residence', category: 'Residential', image: '/images/projects/project-1.jpg' },
  { id: 'proj-2', title: 'Office Complex Renovation', category: 'Commercial', image: '/images/projects/project-2.jpg' },
  { id: 'proj-3', title: 'Luxury Kitchen Remodel', category: 'Renovation', image: '/images/projects/project-3.jpg' },
  { id: 'proj-4', title: 'Retail Store Fit-Out', category: 'Commercial', image: '/images/projects/project-4.jpg' },
  { id: 'proj-5', title: 'Contemporary Townhouse', category: 'Residential', image: '/images/projects/project-5.jpg' },
  { id: 'proj-6', title: 'Industrial Warehouse Conversion', category: 'Commercial', image: '/images/projects/project-6.jpg' },
  { id: 'proj-7', title: 'Family Home Extension', category: 'Residential', image: '/images/projects/project-7.jpg' },
  { id: 'proj-8', title: 'Restaurant Interior', category: 'Commercial', image: '/images/projects/project-8.jpg' },
  { id: 'proj-9', title: 'Nutec Housing Development', category: 'Residential', image: '/images/projects/project-9.jpg' },
  { id: 'proj-10', title: 'Corporate Office White-Box', category: 'Commercial', image: '/images/projects/project-10.jpg' },
  { id: 'proj-11', title: 'Bathroom & Tiling Renovation', category: 'Renovation', image: '/images/projects/project-11.jpg' },
  { id: 'proj-12', title: 'Multi-Unit Residential Complex', category: 'Residential', image: '/images/projects/project-12.jpg' }
];

// Initial default team setup
const defaultTeam = [
  {
    id: 'team-1',
    name: 'Rocky Naidoo',
    position: 'Founder & Director',
    description: 'Rocky founded RASC Trading in 1990 as a sole proprietorship. Under his leadership, the business has grown into one of South Africa\'s premier independent building contractors.',
    image: '/images/about/about-3.jpg'
  },
  {
    id: 'team-2',
    name: 'Shaun Naidoo',
    position: 'Co-Director & Project Manager',
    description: 'Shaun handles on-site executions, structural compliance engineering, and direct customer relations, ensuring all builds are executed on budget and with precision.',
    image: '/images/about/about-4.jpg'
  }
];

// Initialize files if they don't exist
if (!fs.existsSync(PROJECTS_FILE)) {
  fs.writeFileSync(PROJECTS_FILE, JSON.stringify(defaultProjects, null, 2));
}
if (!fs.existsSync(TEAM_FILE)) {
  fs.writeFileSync(TEAM_FILE, JSON.stringify(defaultTeam, null, 2));
}

// Helper: Read JSON file safely
const readJSON = (filePath) => {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error(`Error reading file ${filePath}:`, err);
    return [];
  }
};

// Helper: Write JSON file safely
const writeJSON = (filePath, content) => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(content, null, 2));
    return true;
  } catch (err) {
    console.error(`Error writing file ${filePath}:`, err);
    return false;
  }
};

// Helper: Save Base64 image upload to disk or Supabase
const saveUploadedImage = async (base64Str, prefix) => {
  if (!base64Str || !base64Str.startsWith('data:image')) {
    return base64Str; // Return as is if already a URL or path
  }

  const matches = base64Str.match(/^data:image\/([A-Za-z+0-9]+);base64,(.+)$/);
  if (!matches || matches.length !== 3) {
    return base64Str;
  }

  const ext = matches[1] === 'jpeg' ? 'jpg' : matches[1];
  const data = matches[2];
  const buffer = Buffer.from(data, 'base64');
  const filename = `${prefix}-${Date.now()}.${ext}`;

  if (supabase) {
    try {
      const { error } = await supabase.storage
        .from(supabaseBucket)
        .upload(filename, buffer, {
          contentType: `image/${ext === 'jpg' ? 'jpeg' : ext}`,
          upsert: true
        });

      if (error) throw error;

      const { data: publicUrlData } = supabase.storage
        .from(supabaseBucket)
        .getPublicUrl(filename);

      return publicUrlData.publicUrl;
    } catch (err) {
      console.error('❌ Failed to upload image to Supabase storage, trying local fallback:', err);
    }
  }

  // Local disk fallback
  const uploadDir = join(__dirname, '..', '..', 'public', 'images', 'uploads');

  // Ensure upload folder exists
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  fs.writeFileSync(join(uploadDir, filename), buffer);
  return `/images/uploads/${filename}`;
};

// Seeding helper for Supabase
const seedSupabaseIfEmpty = async () => {
  if (!supabase) return;
  try {
    // Check projects
    const { count: projCount, error: projError } = await supabase
      .from('projects')
      .select('*', { count: 'exact', head: true });
    
    if (!projError && projCount === 0) {
      console.log('🌱 Seeding default projects to Supabase...');
      const { error } = await supabase.from('projects').insert(defaultProjects);
      if (error) throw error;
    }

    // Check team
    const { count: teamCount, error: teamError } = await supabase
      .from('team')
      .select('*', { count: 'exact', head: true });
    
    if (!teamError && teamCount === 0) {
      console.log('🌱 Seeding default team to Supabase...');
      const { error } = await supabase.from('team').insert(defaultTeam);
      if (error) throw error;
    }
  } catch (err) {
    console.error('⚠️ Supabase seeding check failed (tables might not exist yet):', err);
  }
};

// Trigger seed check after a short delay on startup
setTimeout(seedSupabaseIfEmpty, 5000);

// Middleware: Admin verification check
const verifyAdmin = (req, res, next) => {
  const adminKey = req.headers['x-admin-key'];
  if (adminKey !== (process.env.ADMIN_KEY || 'rasc-admin-2024')) {
    return res.status(401).json({ success: false, error: 'Unauthorized' });
  }
  next();
};

// ============================================
// PROJECTS ENDPOINTS
// ============================================

// GET /api/projects - Retrieve all projects
router.get('/projects', async (req, res) => {
  try {
    if (supabase) {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return res.json({ success: true, data });
    }

    const projectsList = readJSON(PROJECTS_FILE);
    res.json({ success: true, data: projectsList });
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ success: false, error: error.message || 'Internal server error.' });
  }
});

// POST /api/projects - Create a new project (Admin Only)
router.post('/projects', verifyAdmin, async (req, res) => {
  try {
    const { title, category, image } = req.body;
    if (!title || !category || !image) {
      return res.status(400).json({ success: false, error: 'Title, category, and image are required.' });
    }

    const savedImagePath = await saveUploadedImage(image, 'project');

    const newProject = {
      id: `proj-${Date.now()}`,
      title,
      category,
      image: savedImagePath
    };

    if (supabase) {
      const { error } = await supabase
        .from('projects')
        .insert([newProject]);

      if (error) throw error;
      return res.status(201).json({ success: true, data: newProject });
    }

    const projectsList = readJSON(PROJECTS_FILE);
    projectsList.unshift(newProject);
    writeJSON(PROJECTS_FILE, projectsList);

    res.status(201).json({ success: true, data: newProject });
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ success: false, error: error.message || 'Internal server error.' });
  }
});

// DELETE /api/projects/:id - Remove a project (Admin Only)
router.delete('/projects/:id', verifyAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    if (supabase) {
      const { data: project } = await supabase
        .from('projects')
        .select('image')
        .eq('id', id)
        .single();

      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);

      if (error) throw error;

      if (project && project.image && project.image.includes(supabaseBucket)) {
        try {
          const urlParts = project.image.split('/');
          const filename = urlParts[urlParts.length - 1];
          await supabase.storage.from(supabaseBucket).remove([filename]);
        } catch (storageErr) {
          console.error('Failed to clean up image from Supabase Storage:', storageErr);
        }
      }

      return res.json({ success: true, message: 'Project removed successfully.' });
    }

    let projectsList = readJSON(PROJECTS_FILE);
    const initialLength = projectsList.length;
    projectsList = projectsList.filter(p => p.id !== id);

    if (projectsList.length === initialLength) {
      return res.status(404).json({ success: false, error: 'Project not found.' });
    }

    writeJSON(PROJECTS_FILE, projectsList);
    res.json({ success: true, message: 'Project removed successfully.' });
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({ success: false, error: error.message || 'Internal server error.' });
  }
});

// ============================================
// TEAM MEMBERS ENDPOINTS
// ============================================

// GET /api/team - Retrieve all team members
router.get('/team', async (req, res) => {
  try {
    if (supabase) {
      const { data, error } = await supabase
        .from('team')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) throw error;
      return res.json({ success: true, data });
    }

    const teamList = readJSON(TEAM_FILE);
    res.json({ success: true, data: teamList });
  } catch (error) {
    console.error('Error fetching team:', error);
    res.status(500).json({ success: false, error: error.message || 'Internal server error.' });
  }
});

// POST /api/team - Add a team member (Admin Only)
router.post('/team', verifyAdmin, async (req, res) => {
  try {
    const { name, position, description, image } = req.body;
    if (!name || !position || !description || !image) {
      return res.status(400).json({ success: false, error: 'All fields (name, position, bio, and image) are required.' });
    }

    const savedImagePath = await saveUploadedImage(image, 'team');

    const newMember = {
      id: `team-${Date.now()}`,
      name,
      position,
      description,
      image: savedImagePath
    };

    if (supabase) {
      const { error } = await supabase
        .from('team')
        .insert([newMember]);

      if (error) throw error;
      return res.status(201).json({ success: true, data: newMember });
    }

    const teamList = readJSON(TEAM_FILE);
    teamList.push(newMember);
    writeJSON(TEAM_FILE, teamList);

    res.status(201).json({ success: true, data: newMember });
  } catch (error) {
    console.error('Error adding team member:', error);
    res.status(500).json({ success: false, error: error.message || 'Internal server error.' });
  }
});

// DELETE /api/team/:id - Remove a team member (Admin Only)
router.delete('/team/:id', verifyAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    if (supabase) {
      const { data: member } = await supabase
        .from('team')
        .select('image')
        .eq('id', id)
        .single();

      const { error } = await supabase
        .from('team')
        .delete()
        .eq('id', id);

      if (error) throw error;

      if (member && member.image && member.image.includes(supabaseBucket)) {
        try {
          const urlParts = member.image.split('/');
          const filename = urlParts[urlParts.length - 1];
          await supabase.storage.from(supabaseBucket).remove([filename]);
        } catch (storageErr) {
          console.error('Failed to clean up image from Supabase Storage:', storageErr);
        }
      }

      return res.json({ success: true, message: 'Team member removed successfully.' });
    }

    let teamList = readJSON(TEAM_FILE);
    const initialLength = teamList.length;
    teamList = teamList.filter(t => t.id !== id);

    if (teamList.length === initialLength) {
      return res.status(404).json({ success: false, error: 'Team member not found.' });
    }

    writeJSON(TEAM_FILE, teamList);
    res.json({ success: true, message: 'Team member removed successfully.' });
  } catch (error) {
    console.error('Error deleting team member:', error);
    res.status(500).json({ success: false, error: error.message || 'Internal server error.' });
  }
});

// PUT /api/team/:id - Update a team member (Admin Only)
router.put('/team/:id', verifyAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, position, description, image } = req.body;

    if (!name || !position || !description) {
      return res.status(400).json({ success: false, error: 'Name, position, and description are required.' });
    }

    let savedImagePath = image;
    // Only process upload if it's a new Base64 string
    if (image && image.startsWith('data:image')) {
      savedImagePath = await saveUploadedImage(image, 'team');
    }

    if (supabase) {
      // 1. Get original image for cleanup if we uploaded a new one
      let oldImage = null;
      if (image && image.startsWith('data:image')) {
        const { data: member } = await supabase
          .from('team')
          .select('image')
          .eq('id', id)
          .single();
        if (member) oldImage = member.image;
      }

      // 2. Perform update
      const updateData = {
        name,
        position,
        description
      };
      if (savedImagePath) {
        updateData.image = savedImagePath;
      }

      const { error } = await supabase
        .from('team')
        .update(updateData)
        .eq('id', id);

      if (error) throw error;

      // 3. Clean up old image from storage if replaced
      if (oldImage && oldImage.includes(supabaseBucket) && savedImagePath !== oldImage) {
        try {
          const urlParts = oldImage.split('/');
          const filename = urlParts[urlParts.length - 1];
          await supabase.storage.from(supabaseBucket).remove([filename]);
        } catch (storageErr) {
          console.error('Failed to clean up old image from Supabase Storage:', storageErr);
        }
      }

      // Construct return data
      const updatedMember = { id, ...updateData };
      if (!updateData.image && oldImage) {
        updatedMember.image = oldImage;
      }
      return res.json({ success: true, data: updatedMember });
    }

    // Local JSON Fallback
    const teamList = readJSON(TEAM_FILE);
    const memberIndex = teamList.findIndex(t => t.id === id);

    if (memberIndex === -1) {
      return res.status(404).json({ success: false, error: 'Team member not found.' });
    }

    const oldMember = teamList[memberIndex];
    const updatedMember = {
      ...oldMember,
      name,
      position,
      description,
      image: savedImagePath || oldMember.image
    };

    teamList[memberIndex] = updatedMember;
    writeJSON(TEAM_FILE, teamList);

    res.json({ success: true, data: updatedMember });
  } catch (error) {
    console.error('Error updating team member:', error);
    res.status(500).json({ success: false, error: error.message || 'Internal server error.' });
  }
});

export default router;
