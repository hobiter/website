import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI Era Long-Term Investing Framework',
  description: 'Long-term AI investing framework covering workflow, data, infrastructure, distribution, and AI platform companies.',
}

const STOCKS = [
  ['NOW','Enterprise AI OS'],
  ['META','AI Distribution'],
  ['GOOGL','AI Knowledge Platform'],
  ['AMZN','AI Commerce + Cloud'],
  ['WDAY','Enterprise Data Layer'],
  ['ORCL','AI Infrastructure Utility'],
  ['MSFT','Enterprise AI Monopoly'],
  ['RDDT','Human Knowledge Graph'],
  ['NVDA','AI Compute King'],
  ['TSLA','AI Civilization Option'],
]

const TABLE = [
['NOW','$13B','20%+','30%','$9B','$2B','7x','$180B'],
['META','$190B','15-18%','42%','$95B','$28B','7x','$1.7T'],
['GOOGL','$420B','12-15%','33%','$120B','$26B','5x','$2.1T'],
['AMZN','$760B','11-14%','12%','$95B','$145B','3.5x','$2.3T'],
['WDAY','$9B','13-15%','28%','$8B','$3B','3.4x','$85B'],
['ORCL','$67B','18-20%','44%','$20B','$95B','6x','$620B'],
['MSFT','$310B','14-16%','45%','$105B','$60B','13x','$4T'],
['RDDT','$2B','35%+','Low','$2B','$1B','11x','$35B'],
['NVDA','$220B','35-50%','60%','$95B','$12B','18x','$5T'],
['TSLA','$130B','10-15%','12%','$38B','$15B','10x','$1.1T'],
]

function Section({title, children}:{title:string, children:React.ReactNode}){
 return <section className='rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm'><h2 className='text-3xl font-semibold'>{title}</h2><div className='mt-5 space-y-5 leading-8 text-zinc-700'>{children}</div></section>
}

export default function Page(){
 return (
 <main className='min-h-screen bg-gradient-to-b from-white to-zinc-50 px-6 py-10 text-zinc-900'>
  <div className='mx-auto max-w-7xl space-y-8'>
   <header className='rounded-[2rem] border border-zinc-200 bg-white p-10 shadow-sm'>
    <p className='text-sm uppercase tracking-[0.3em] text-zinc-500'>AI Investing Framework</p>
    <h1 className='mt-5 text-5xl font-semibold leading-tight md:text-7xl'>AI Era Long-Term Investing Framework</h1>
    <p className='mt-6 max-w-5xl text-xl text-zinc-600'>A deep framework for investing in the AI era through workflow, data, infrastructure, distribution, commerce, and knowledge platforms.</p>
   </header>

   <Section title='Core Thesis'>
    <p>The biggest winners of the AI era are unlikely to be the companies with the best models alone.</p>
    <p>The true long-term winners will likely control workflow, enterprise data, distribution, infrastructure, attention, and commerce.</p>
    <p>AI models may become commoditized over time. Platforms are much harder to replace.</p>
   </Section>

   <Section title='Top AI Platform Companies'>
    <div className='grid gap-4 md:grid-cols-2'>
      {STOCKS.map(([ticker, thesis]) => (
        <div key={ticker} className='rounded-2xl border border-zinc-200 p-5'>
          <div className='text-2xl font-semibold'>{ticker}</div>
          <div className='mt-2 text-zinc-600'>{thesis}</div>
        </div>
      ))}
    </div>
   </Section>

   <Section title='Fundamental Comparison'>
    <div className='overflow-x-auto'>
      <table className='min-w-full border-collapse text-sm'>
        <thead>
          <tr className='bg-zinc-100'>
            <th className='border p-3'>Stock</th>
            <th className='border p-3'>Revenue</th>
            <th className='border p-3'>Growth</th>
            <th className='border p-3'>Margin</th>
            <th className='border p-3'>Cash</th>
            <th className='border p-3'>Debt</th>
            <th className='border p-3'>PS</th>
            <th className='border p-3'>Market Cap</th>
          </tr>
        </thead>
        <tbody>
          {TABLE.map((row) => (
            <tr key={row[0]}>
              {row.map((cell) => <td key={cell} className='border p-3'>{cell}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
   </Section>

   <Section title='Most Attractive Long-Term AI Investments'>
    <ul className='list-disc space-y-2 pl-6'>
      <li>ServiceNow: enterprise AI operating system</li>
      <li>Meta: AI distribution and attention monopoly</li>
      <li>Google: AI knowledge and search infrastructure</li>
      <li>Amazon: AI commerce and cloud platform</li>
      <li>Workday: enterprise AI data layer</li>
    </ul>
   </Section>

   <Section title='Portfolio Allocation'>
    <p>Core long-term allocation:</p>
    <ul className='list-disc space-y-2 pl-6'>
      <li>NOW 20%</li>
      <li>META 20%</li>
      <li>GOOGL 15%</li>
      <li>AMZN 10%</li>
      <li>WDAY 10%</li>
      <li>ORCL 10%</li>
      <li>MSFT 5%</li>
      <li>NVDA 5%</li>
      <li>RDDT 3%</li>
      <li>TSLA 2%</li>
    </ul>
   </Section>
  </div>
 </main>)
}
