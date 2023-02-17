-- Select the address and the total_balance of the wallet, where the total balance is computed by summing up the balance for each denom, and then multiplying it by the USD value of that denom.
SELECT b.address, 
       SUM(CASE 
            -- If the denom is usdc, divide the amount by 1000000 to convert it into USD. 
            -- Note that the USD value of usdc is 0.000001.
            WHEN b.denom = 'usdc' THEN b.amount/1000000.0 
            -- If the denom is swth, divide the amount by 200000 to convert it into USD. 
            -- Note that the USD value of swth is 0.00000005.
            WHEN b.denom = 'swth' THEN b.amount/200000.0 
            -- If the denom is tmz, multiply the amount by 0.003 to convert it into USD. 
            -- Note that the USD value of tmz is 0.003.
            WHEN b.denom = 'tmz' THEN b.amount*0.003 
            -- If the denom is not one of the above, set the value to 0.0.
            ELSE 0.0 
          END) as total_balance 
-- From the balances table, join the trades table on the address column, where the block height of both tables are greater than 730000 (recent trades).
FROM balances b 
JOIN trades t ON b.address = t.address 
WHERE b.block_height > 730000 AND t.block_height > 730000 
-- Group the result set by address.
GROUP BY b.address 
-- Filter out the rows that don't meet the minimum balance requirement of $500.
HAVING SUM(CASE 
            WHEN b.denom = 'usdc' THEN b.amount/1000000.0 
            WHEN b.denom = 'swth' THEN b.amount/200000.0 
            WHEN b.denom = 'tmz' THEN b.amount*0.003 
            ELSE 0.0 
           END) >= 500.0;