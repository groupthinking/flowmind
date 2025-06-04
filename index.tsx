// Add controls at top
const [sortBy, setSortBy] = useState('trending'); // trending, latest, most_remixed

// ...
<div className="flex gap-3 mb-6">
  <button onClick={()=>setSortBy('trending')} className={sortBy==='trending'?'font-bold':''}>🔥 Trending</button>
  <button onClick={()=>setSortBy('latest')} className={sortBy==='latest'?'font-bold':''}>🕑 Latest</button>
  <button onClick={()=>setSortBy('most_remixed')} className={sortBy==='most_remixed'?'font-bold':''}>🎛️ Most Remixed</button>
</div>