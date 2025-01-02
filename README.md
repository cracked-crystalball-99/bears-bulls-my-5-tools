# bears-bulls-my-5-tools

I have created a web app tool for simplifying traditional technial analysis.
The web app simplifies or reduces each tool to a pair of percentages.

After processing your closing price data for cryptos or stocks,
the web app presents percentages in the last table: Votes Innovative Percentages (VIP %).
For each of the up to 5 tools, you find there a pair of percentages.

It is a good idea to use at least 5 months of closing price data. 
That amount gives the algorithms more to work with. You can use the sample
data to get started. Look for csv files, titled: AMZN (Amazon), GME (GameStop Corp.),
BHP.AX (BHP Group Limited). 

Alternatively, or in addition to, you may well obtain closing price data 
via RStudio, and the R language. Here follows a
sample snippet of implementation code for the R language:

# 1. Load R packages 
library("TTR")
library("quantmod")
library("PerformanceAnalytics")

library("writexl")

## 2. Data Downloading or Reading

# 2.1.Yahoo Finance
getSymbols("<your code>",src="yahoo",from="2024-08-01",to="2024-12-20")

The percentages represent cumulative calculations, indicating an opinion.
The left-side, coded in green, shows the buy or yes vote percentage. 
On the right-side, coded in red, shows the sell or no vote percentage.

You interpret the percentages as to persuasiveness. 
