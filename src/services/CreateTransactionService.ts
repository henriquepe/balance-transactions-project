import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    // TODO
    const balance = this.transactionsRepository.getBalance();

    const verify = type === 'outcome' && value > balance.total;

    if (verify) {
      throw Error(
        'The cashier was be extrapolated, cant create a new output transaction',
      );
    }
    const newTransaction = this.transactionsRepository.create({
      title,
      value,
      type,
    });

    return newTransaction;
  }
}

export default CreateTransactionService;
