import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    // TODO
    return this.transactions;
  }

  public getBalance(): Balance {
    // TODO
    const IncomeTransactions = this.transactions.filter(
      transactions => transactions.type === 'income',
    );

    const OutcomeTransactions = this.transactions.filter(
      transactions => transactions.type === 'outcome',
    );

    const balanceIncome = IncomeTransactions.reduce(
      (acumulatedValue, incomeTransactionsValue) => {
        return acumulatedValue + incomeTransactionsValue.value;
      },
      0,
    );

    const balanceOutcome = OutcomeTransactions.reduce(
      (acumulatedValue, OutcomeTransactionsValue) => {
        return acumulatedValue + OutcomeTransactionsValue.value;
      },
      0,
    );

    const total = balanceIncome - balanceOutcome;

    const balance = {
      income: balanceIncome,
      outcome: balanceOutcome,
      total,
    };

    return balance;
  }

  public create({ title, type, value }: CreateTransactionDTO): Transaction {
    // TODO
    const transaction = new Transaction({
      title,
      type,
      value,
    });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
