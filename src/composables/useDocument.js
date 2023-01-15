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
  }

  const updateDoc = async (data) => {
    isPending.value = true
    error.value = null
    try {
      const res = await docRef.update(data)
      isPending.value = false
      return res
    } catch (err) {
      console.log(err.message);
      isPending.value = false
      error.value = "Could not update the Document"
    }
  }

  return {deleteDoc, updateDoc, error, isPending}
}

export default useDocument