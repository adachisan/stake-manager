# Stake Manager

`Automated token staking contract information feeder.`

This Staking Bot is a tool built with Node.js that automatically updates the list of users, their staking amount and the Annual Percentage Rate (APR) on my token's staking contract. The bot retrieves information from a Posichain pool of stake, and then uses this data to update the staking contract.

The bot executes once per day to ensure that the staking contract is always up-to-date with the latest information from the Posichain pool.
Retrieves a list of all users who are currently staking on the Posichain pool, and then updates the staking contract to reflect this information.
Also retrieves the current APR for the Posichain pool and updates the staking contract accordingly.