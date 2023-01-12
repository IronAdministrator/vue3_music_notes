import { projectFirestore } from '@/firebase/config';
import { ref } from 'vue';

const useDocument = (collection, id) => {
  const error = ref(null)
  const isPending = ref(false)
  let docRef = projectFirestore.collection(collection).doc(id)
  const deleteDoc = async () => {
    isPending.value = true
    error.value = null
    // await projectFirestore.collection(collection).doc(id).delete()
    try {
      const res = await docRef.delete()
      isPending.value = false
      return res
    } catch (err) {
      console.log(err.message);
      isPending.value = false
      error.value = "Could not delete the Document"
    }
    console.log(id);
  }
  return {deleteDoc, error, isPending}
}

export default useDocument