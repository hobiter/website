# Episode 1 Script: How an AI Chip Gets Made

Approximately 20 minutes at around 133 words per minute. Timings are cues. Do not read source links aloud.

## 01 · 00:00 · How an AI Chip Gets Made

Imagine that you order an AI accelerator. A server arrives at your data center, with one vendor's name on the box. Look inside and the story breaks into several businesses. Someone designed the processor. Someone printed the circuits on a wafer. Someone made the memory. Someone assembled the pieces into a package that can actually move data at the required rate. And someone still has to get the rack running after all of that. A shortage in any one of those businesses can change when your order arrives. It can also change who captures the profit. In this series we're going to trace that money, starting with the physical product. Today we'll use NVIDIA, TSMC, and ASML as examples, and we'll finish by working through a valuation rather than dropping a target price on screen. The question for the whole season is simple: when does a technical advantage become cash that shareholders can keep?

## 02 · 01:10 · From a Design File to a Rack

Start at the top of the map. A designer decides which operations the chip must perform and how data should move between them. Engineers describe the circuits and use electronic design automation tools to translate that description into physical layouts, route signals, and check that the design can meet timing and power limits. Verification deserves attention. A serious logic error can mean ordering a new mask set and waiting for another manufacturing run. You cannot simply treat every hardware flaw as a software update.

At the foundry, the wafer visits a sequence of manufacturing tools. Lithography defines a pattern. Deposition adds a layer of material. Etch removes material where the process calls for it. Inspection and metrology tell the fab where results have drifted. Those steps repeat across many layers. Next, a high-end accelerator may need memory stacks, advanced packaging, and another round of testing. Finally, the system needs a network, electricity, and cooling. Think of these as commitments that must line up, sometimes across different companies and different lead times. From the engineer's perspective the goal is useful workload throughput. From the investor's perspective the question is which supplier can meet the specification with few credible alternatives, and for how long.

Think about the purchasing decision from the designer's side. You don't simply send the same layout to a different foundry and ask for a lower quote. The process has its own design rules and libraries. Engineers may need to redo physical design work and validate the new implementation, then put the package through another round of testing. Sampling one good chip and delivering millions on schedule are different achievements. Switching costs can come from a calendar as much as from a contract.

Sources (not read aloud):
- [Primary source 1](https://www.asml.com/en/technology/all-about-microchips/how-microchips-are-made)

## 03 · 03:18 · What the Chip Designer Sells

The same physical chip can offer two customers very different economics. In training, many accelerators may have to exchange intermediate results. A single device can look impressive in isolation while the cluster spends more time than expected waiting for communication. In inference, the workload might be a real-time conversation, where time to the first token matters, or an overnight batch job, where you can trade latency for utilization. Those are two distinct purchasing decisions.

That's why I start with the workload before comparing peak compute. Which model? Which precision? What context length? What latency limit? How many real requests can the system finish under that constraint, including time that racks sit idle? The answer should also include networking, power, and the engineering cost of deploying the system. NVIDIA can benefit when its software and hardware work together to reduce that deployment risk. The competitive test is whether another supplier can offer a better total cost for the customer's actual job. A hyperscaler with enough repeated demand can afford a team to tune its own chip and software. A smaller customer may get more value by buying a broader, more mature platform. Both decisions can be rational at the same time.

For a practical comparison, hold the quality target fixed and ask how many completed requests the fleet handles per hour. A vendor could use a different precision, a shorter context, or a larger batch to show a better throughput number. That result may be legitimate under its test conditions and still fail a customer's service target. In the later accelerator episode we'll ask what would actually change a procurement decision: a benchmark, developer time saved, or a fleet that performs better under load for several months.

## 04 · 05:27 · How Die Yield Changes Unit Cost

Here's a simple example. The twenty thousand dollars on screen is a teaching assumption, not a quote from a foundry. Say one wafer lays out one hundred candidate dies. If eighty pass, the wafer cost per good die is two hundred and fifty dollars. If only sixty pass, the same wafer costs roughly three hundred and thirty-three dollars per good die. Yield fell by twenty percentage points and cost per good die went up by a third. No change in the wafer bill was needed. The same production time simply turned into fewer saleable parts.

Real economics have more moving pieces. Large dies can expose more area to defects. The wafer edge affects how many complete dies fit. Some chips are sold in lower performance bins rather than discarded. And a die that passes wafer testing still needs to survive assembly and final test. Splitting a design into chiplets can improve usable output or let the designer put different functions on different nodes. That saving has to clear the cost of packaging, extra interfaces, verification, and power. So when someone says a new node or a chiplet architecture is automatically cheaper, ask for the cost of a working device at scale. A good process on paper still has to ramp at a yield and volume the customer can use.

Try the example in reverse. How many wafers do you need to supply eighty good dies? At eighty percent yield, our simplified model needs one wafer. At sixty percent it needs the equivalent of one and a third. Scale that up and the same customer commitment now consumes more equipment time. If the fab is already full, that matters beyond the material bill: those tools cannot simultaneously fill another order. That's why yield and capacity are so difficult to separate in a shortage.

## 05 · 07:43 · HBM and Advanced Packaging

A processor can perform a lot of arithmetic only if the data arrives on time. High bandwidth memory stacks DRAM and uses a wide interface to exchange data with the processor. In a common high-end 2.5D arrangement, the logic die and several HBM stacks sit close together and use dense package interconnects. TSMC's CoWoS is one family of ways to do that. The exact interposer and wiring approach depend on the package.

Here's a capacity example. Say you've got a hundred thousand good logic dies. Each finished accelerator needs eight qualified HBM stacks, and you have six hundred and forty thousand matching stacks. Divide by eight: that's eighty thousand possible sets, before packaging or test loss. More logic wafers cannot raise that ceiling this quarter. If memory catches up but the available packaging line can turn out only seventy thousand units, the binding constraint moves. For investors, that's the important part. High margins during a shortage can be real, and still tell you little about margins five years later. Look at whether alternative capacity meets the same qualification requirements, whether customers can actually switch, and whether the next link in the chain can absorb the extra output.

Test isn't just a stamp at the end of the line. Discovering a bad component after you've joined it to several expensive components can turn a single defect into a much larger scrap bill. Testing known-good die before assembly has economic value, and final testing still matters because the assembly itself added new ways to fail. That gives us another useful way to look at packaging investments: higher density has to come with a path to screening, assembly yields and reliable volume. The impressive engineering sample is only the first checkpoint.

Sources (not read aloud):
- [Primary source 1](https://3dfabric.tsmc.com/english/dedicatedFoundry/technology/cowos.htm)

## 06 · 09:53 · NVIDIA, TSMC and ASML

Let's put the three businesses back on the map. These are historical fiscal-year anchors, not the latest quarterly readings. NVIDIA's fiscal 2026 ended in January 2026. TSMC and ASML are on calendar 2025 here. Currencies differ, and the revenue definitions differ. It makes no sense to add the three figures as a measure of industry revenue.

NVIDIA reported about two hundred sixteen billion U.S. dollars in revenue, of which about one hundred ninety-four billion was Data Center. That's useful for gauging the company's exposure to data-center spending, but it's not a count of GPUs or a claim that all Data Center revenue comes from the same product. TSMC recorded about three point eight one trillion Taiwan dollars of consolidated revenue. Processes at seven nanometers and beyond accounted for seventy-four percent of wafer revenue. Wafer revenue is the denominator, and the metric isn't an estimate of the AI share of revenue. ASML reported about thirty-two point seven billion euros of sales, including roughly eight point two billion in Installed Base Management. That category includes service and field options. It's a useful part of the economics, though treating it as a fixed subscription stream would be a mistake. Each company faces a different kind of demand signal, even when their customers are all talking about the same accelerator build-out.

These metrics answer different questions. The Data Center share tells us something about end-market exposure. The advanced-node share tells us about wafer mix. Aftermarket revenue tells us something about the relationship with customers once a machine is on the floor. Suppose ASML sells fewer new systems while service grows. That could soften the revenue decline, but it would not mean there has been no change in investment demand. The point of picking a figure is to identify the risk it sheds light on, not to find three numbers that look comparable in a chart.

Sources (not read aloud):
- [Primary source 1](https://nvidianews.nvidia.com/news/nvidia-announces-financial-results-for-fourth-quarter-and-fiscal-2026)
- [Primary source 2](https://investor.tsmc.com/static/annualReports/2025/english/index.html)
- [Primary source 3](https://www.asml.com/news/press-releases/2026/q4-2025-financial-results)

## 07 · 12:14 · Three Sources of Profit

Here's what I'd track across a few quarters. For NVIDIA, I'd start with the number of systems customers actually deploy, then look at selling price and product mix. Software and system support can protect share, but a stable inference workload gives alternatives a clearer target. I'd look for what the customer keeps buying after the initial build, rather than treating a launch as evidence that every order will recur.

For TSMC I'd separate added capacity from added cash flow. Higher utilization spreads fixed costs across more output. New capacity is different: you spend the cash before the fab can operate at scale. Depreciation shows up over time. That means profits can rise while free cash flow fails to keep pace. It's worth asking what portion of a spending increase is needed just to retain competitive position. For ASML I'd track demand for critical lithography steps, delivery and installation timing, and service on machines already operating. Even steady progress in advanced nodes does not eliminate lumpy customer purchases. Read the order and shipment figures with the timing in mind. The equipment may be ordered well before it goes into a fab. The fab has to qualify a product. The ultimate customer might still be months away from turning the capacity into revenue.

There's another implication for investors. If you value the designer, foundry and equipment supplier separately, don't automatically give all three the same growth rate or multiple because all three benefit from AI. One might get orders early and face a lull later. Another might ramp slowly but hold a strong position across several product generations. Follow one real deployment from order to production to use. That timeline is often more informative than comparing three quarterly growth rates on one screen.

## 08 · 14:25 · Working Back From Future Earnings

Let's work through a valuation using TSMC's Taiwan-listed ordinary share. Every figure on this slide is in Taiwan dollars per ordinary share where applicable. Please don't compare the result directly with the U.S. ADS quote. The historical anchor is sixty-six Taiwan dollars and twenty-five cents of diluted earnings per share in 2025. For a three-year exercise, suppose the final earnings numbers are eighty-five, one hundred ten, and one hundred thirty-five. Pair those with terminal multiples of sixteen, twenty-two, and twenty-seven times. These are illustrative assumptions I chose to show the mechanics. They're neither management guidance nor equally probable forecasts.

Take the middle column. One hundred ten times twenty-two gives twenty-four hundred and twenty at the end of year three. If I want a ten percent annual price return, I divide that number by one point one cubed. That gets about eighteen hundred and eighteen today. The rest of the slide uses the same calculation. This tells me what price fits my assumptions and return hurdle. It does not tell me where the market is going. We also left out dividends, fees, taxes, currency movements, and any live quote. Sensitivity matters here. If the company earns the same one hundred ten but the market pays only sixteen times earnings, the discounted amount drops to about thirteen hundred and twenty-two. You can call the business outlook correctly and still overpay for it.

You can also take the exercise in the opposite direction. Start with an observed stock price. Compound it forward at your required return and divide by a plausible terminal multiple. That gives the year-three earnings you need. Ask whether that number is consistent with a credible ramp in wafer output, utilization and product mix. This makes the disagreement with the market concrete. You might believe the ramp is feasible but think the assumed multiple is too high; or you might accept the multiple and disagree on what the company can earn. Finally, when you use the U.S. listing, check the depositary share ratio and exchange rate before comparing any numbers.

Sources (not read aloud):
- [Primary source 1](https://www.sec.gov/Archives/edgar/data/1046179/000104617926000201/tsm_20260416.htm)

## 09 · 16:59 · Three Variables for the Next Five Years

Looking ahead, I want observable tests rather than a story the investor can always explain away. First, as the cost per inference request falls, does paid usage rise enough to create an attractive business? A decline in cost per request gives you no direct answer about revenue. If lower costs open uses that were uneconomical before, demand can respond strongly. If customers use the product but will not pay a sustainable price, that same efficiency improvement has a different investment implication.

Second, can memory, logic and packaging expand at the same time? A capacity announcement gives you a headline number. It doesn't tell you when the line will be ready, which products it can run, or who has qualified it. Third, where does the cash go after the expansion? Strong demand can pull a whole industry into heavy capital spending. The best reported margin during the shortage might belong to a business that then has to reinvest unusually hard. Three developments would send me back to the model: customers pushing deployments out, alternative suppliers winning serious qualifications, and free cash flow margins failing to recover when a heavy build should be easing. None is a trading rule. Each would make me recheck what I was paying for.

A useful practice is to write down what would change your mind before the next earnings release. Say a customer pushed the opening of a new facility back. Would that change the terminal demand assumption, or only the timing of revenue? Say a new memory supplier started shipping into one platform. How much of the incumbent's pricing power is now at risk? The answer rarely fits a headline. The aim is to connect each new observation to a specific part of your forecast.

## 10 · 19:10 · Next: Architecture, IP and EDA

Let me close with the distinction we'll return to throughout the series. A part can be technically scarce. Its maker can have real pricing power. And the stock can still offer an unattractive return at the price you pay. Those are three different questions. Start with the product, follow the customer's alternatives, then work out what cash remains after reinvestment. The number on the screen comes last. This episode set the map. Next time we'll go upstream of the wafer into architecture, IP licensing and design software. We'll ask who gets paid when engineers start a design, when it goes to manufacturing, and when it ships at scale. Thanks for watching.

Sources (not read aloud):
- [Primary source 1](https://nvidianews.nvidia.com/news/nvidia-announces-financial-results-for-fourth-quarter-and-fiscal-2026)
- [Primary source 2](https://investor.tsmc.com/static/annualReports/2025/english/index.html)
- [Primary source 3](https://www.asml.com/news/press-releases/2026/q4-2025-financial-results)
