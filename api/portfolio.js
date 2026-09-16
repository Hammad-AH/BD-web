import supabase from './db-client.js';
export default async function handler(req,res){
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Methods','GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers','Content-Type, Authorization');
  if(req.method==='OPTIONS') return res.status(204).end();
  try{
    if(req.method==='GET'){
      const { service } = req.query;
      let query = supabase.from('portfolio_items').select('*').order('id',{ascending:true});
      if(service){ query = query.ilike('service_type', `%${service.replace('-',' ')}%`); }
      const { data, error } = await query;
      if(error) throw error;
      return res.status(200).json(data||[]);
    }
    if(req.method==='POST'){
      const { title, description, before_image, after_image, category, service_type } = req.body;
      const { data, error } = await supabase.from('portfolio_items').insert({ title, description, before_image, after_image, category, service_type }).select().single();
      if(error) throw error;
      return res.status(201).json(data);
    }
    res.status(405).json({error:'Method not allowed'})
  }catch(err){ console.error(err); res.status(500).json({error:err.message}) }
}
