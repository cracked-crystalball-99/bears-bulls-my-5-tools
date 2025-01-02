# 0. bears-bulls-my-5-tools

I have created a web app tool for simplifying typical technical analysis. Typically,
traders do technical analysis by relying on visual charts and lines. 

In comparsion, the web app simplifies or reduces each tool to a pair of percentages. 
No lines or charts required. 

After processing your closing price data for cryptos or stocks,
the web app presents percentages in the last table: Votes Innovative Percentages (VIP %).
For each of the up to 5 tools, you find there a pair of percentages, accumulating for the tool(s). 

It is a good idea to use at least 5 months of closing price data. 
That amount gives the algorithms more to work with. You can use the sample
data to get started. Look for csv files, titled: AMZN (Amazon), GME (GameStop Corp.),
BHP.AX (BHP Group Limited). 

Richer experience via desktop computer use. Please consider next few paragraphs, as to
getting new data. 

Alternatively, or in addition to those sample files, you may well obtain new csv files of closing price data 
via RStudio, and the R language. Here follows 
some implementation code for the R language for getting closing price data, 
aiming toward csv file format:

# 1. Load R packages 
library("TTR")
library("quantmod")
library("PerformanceAnalytics")

library("writexl")

## 2. Data Downloading or Reading

# 2.1.Yahoo Finance
getSymbols("<your code>",src="yahoo",from="2024-08-01",to="2024-12-20")

After you have the variable in the RStudio in global environment, 
write R code to convert and save to a csv file (desktop needed). 

Open in a spreadsheet app like Google Sheets or MS Excel. Format the csv file
so that headings exactly as follows: Date, Open, High, Low, Close, Adj Close, Volume.
You may need to switch the data for Adj Close and Volume. 

This simple yet exact formatting enables you to upload to the web app. 

# 3. Back to the web app. 

The pair of percentages, in the final table, represent cumulative calculations, indicating an opinion.
At the very-bottom of the table, the VIP % row, that row shows final outputs for the web app. 

The left-side cell, coded in green, shows the buy or yes vote percentage. 

On the right-side, coded in red, shows the sell or no vote percentage.

You interpret the percentages as to persuasiveness. 

# 3.1. chart for visualisation of percentage of votes or signals

The graph is just a visual representation of the percentages. Best wishes. 
