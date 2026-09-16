import supabase from './db-client.js';
export default async function handler(req,res){
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Methods','GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers','Content-Type, Authorization');
  if(req.method==='OPTIONS') return res.status(204).end();
  try{
    if(req.method==='GET'){
      const { data, error } = await supabase.from('quote_requests').select('*').order('created_at',{ascending:false}).limit(100);
      if(error) throw error;
      return res.status(200).json(data);
    }
    if(req.method==='POST'){
      const { name, email, phone, company, service_type, budget, details, file_name } = req.body;
      if(!name || !email || !details) return res.status(400).json({error:'Missing required fields'});
      const { data, error } = await supabase.from('quote_requests').insert({ name, email, phone, company, service_type, budget, details, file_name, status:'new' }).select().single();
      if(error) throw error;
      return res.status(201).json(data);
    }
    res.status(405).json({error:'Method not allowed'})
  }catch(err){ console.error(err); res.status(500).json({error:err.message}) }
}
