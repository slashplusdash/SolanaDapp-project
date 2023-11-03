import { useTodo } from '../hooks/todo'
import dynamic from 'next/dynamic';
import Loading from '../components/Loading'
import TodoSection from '../components/todo/TodoSection'
import styles from '../styles/Home.module.css'



const WalletMultiButtonDynamic = dynamic(
    () => import('@solana/wallet-adapter-react-ui').then((module) => {
      if (module.WalletMultiButton) {
        return module.WalletMultiButton;
      } else {
        throw new Error('WalletMultiButton component not found');
      }
    }),
    { ssr: false }
  );
  

const Home = () => {
    const { initialized, initializeUser, loading, transactionPending, completedTodos, incompleteTodos, addTodo, markTodo, removeTodo, input,  handleChange } = useTodo()


    return (
        <div className={styles.container}>
            <div className={styles.actionsContainer}>
                {initialized ? (
                    <div className={styles.todoInput}>
                        <div className={`${styles.todoCheckbox} ${styles.checked}`} />
                        <div className={styles.inputContainer}>
                            <form onSubmit={(e) => { e.preventDefault(); addTodo(); }}>
                                <input value = {input} onChange={handleChange} id={styles.inputField} type="text" placeholder='Create a new todo...' />
                            </form>
                        </div>
                        <div className={styles.iconContainer}>
       
                        </div>
                    </div>
                ) : (
                    <button type="button" className={styles.button} onClick={() => initializeUser()} disabled={transactionPending}>
                        Initialize
                    </button>
                )}
                <WalletMultiButtonDynamic/>
            </div>

            <div className={styles.mainContainer}>
                <Loading loading={loading}>
                    <TodoSection title="Tasks" todos={incompleteTodos} action={markTodo} />

                    <TodoSection title="Completed" todos={completedTodos} action={removeTodo} />
                </Loading>
            </div>
        </div>
    )
}

export default Home

// import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
// import { useTodo } from '../hooks/todo'
// import Loading from '../components/Loading'
// import TodoSection from '../components/todo/TodoSection'
// import styles from '../styles/Home.module.css'


// const Home = () => {
//     const { initialized, initializeUser, loading, transactionPending, completedTodos, incompleteTodos, addTodo, markTodo, removeTodo, input,  handleChange } = useTodo()


//     return (
//         <div className={styles.container}>
//             <div className={styles.actionsContainer}>
//                 {initialized ? (
//                     <div className={styles.todoInput}>
//                         <div className={`${styles.todoCheckbox} ${styles.checked}`} />
//                         <div className={styles.inputContainer}>
//                             <form onSubmit={()=> addTodo()}>
//                                 <input value = {input} onChange={handleChange} id={styles.inputField} type="text" placeholder='Create a new todo...' />
//                             </form>
//                         </div>
//                         <div className={styles.iconContainer}>
       
//                         </div>
//                     </div>
//                 ) : (
//                     <button type="button" className={styles.button} onClick={() => initializeUser()} disabled={transactionPending}>
//                         Initialize
//                     </button>
//                 )}
//                 <WalletMultiButton />
//             </div>

//             <div className={styles.mainContainer}>
//                 <Loading loading={loading}>
//                     <TodoSection title="Tasks" todos={incompleteTodos} action={markTodo} />

//                     <TodoSection title="Completed" todos={completedTodos} action={removeTodo} />
//                 </Loading>
//             </div>
//         </div>
//     )
// }

// export default Home